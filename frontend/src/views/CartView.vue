<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Component } from '@/components/types/component'
import { getComponents } from '@/services/ComponentAPI'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'
import Loader from '@/components/ui/Loader.vue'
import TableList from '@/components/ui/TableList.vue'
import { getCart } from '@/services/CartAPI'

const products = ref<Component[]>([])
const headerList = ref<string[]>(['', 'Produit', 'Quantité', 'Prix unitaire', 'Total'])
const { cartProducts, handleSubstractToCart, handleAddToCart } = useCartStore()

watch(
  cartProducts,
  async (newCartProducts) => {
    const components = await getCart(newCartProducts)

    products.value = components
  },
  { immediate: true },
)

const subTotal = computed(() => {
  return (
    products.value?.reduce((total, product) => {
      const quantity = cartProducts.filter((cart) => cart === product.id).length
      console.log('Quantity:', quantity, total)
      return (total * 100 + Number(product.price) * 100 * quantity) / 100
    }, 0) || 0
  )
})
</script>

<template>
  <main>
    <h1 class="font-extrabold text-4xl mb-6">
      Panier
      <span class="text-gray-800 text-xl font-bold">({{ cartProducts.length }})</span>
    </h1>
    <div v-if="products.length === 0" class="font-semibold text-gray-600">Panier vide !</div>
    <div v-if="products.length > 0" class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-3/4 bg-white rounded-3xl shadow-md">
        <TableList :headerList="headerList">
          <tr v-for="product in products" :key="product.id">
            <th>
              <div class="aspect-square h-8">
                <img :src="product.imgUrl" :alt="product.name" />
              </div>
            </th>
            <td class="font-bold text-gray-700">{{ product.name }}</td>
            <td class="font-semibold text-gray-500">
              <div class="flex gap-2">
                <button class="btn btn-xs" @click="handleSubstractToCart(product.id)">-</button>
                <span>{{ cartProducts.filter((cart) => cart === product.id).length }}</span>
                <button class="btn btn-xs" @click="handleAddToCart([product.id])">+</button>
              </div>
            </td>
            <td class="font-medium text-gray-500">{{ formatPrice(product.price) }}</td>
            <td class="font-semibold text-gray-700">
              {{
                formatPrice(
                  (Number(product.price) *
                    100 *
                    Number(cartProducts.filter((cart) => cart === product.id).length)) /
                    100,
                )
              }}
            </td>
          </tr>
        </TableList>
      </div>
      <div class="w-full md:w-1/4 bg-white rounded-3xl shadow-md p-6">
        <div class="w-full flex flex-col items-center gap-4">
          <div>
            <span class="font-medium text-gray-800">Sous total : </span>
            <span class="font-medium">{{ formatPrice(subTotal) }}</span>
          </div>
          <router-link to="/checkout" class="btn btn-secondary w-full">Commander</router-link>
        </div>
      </div>
    </div>
  </main>
</template>
