<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import type { Component } from '@/components/types/component'
import { getComponents } from '@/services/ComponentAPI'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'
import Loader from '@/components/ui/Loader.vue'
import TableList from '@/components/ui/TableList.vue'
import { getCart } from '@/services/CartAPI'

const props = defineProps<{
  products: Component[]
  isEditQuantity: boolean
}>()

const { cartProducts, handleSubstractToCart, handleAddToCart } = useCartStore()

const { products, isEditQuantity } = toRefs(props)

const headerList = ref<string[]>(['', 'Produit', 'Prix unitaire', 'Quantité', 'Total'])
</script>

<template>
  <div v-if="products.length === 0" class="font-semibold text-gray-600">Panier vide !</div>
  <div v-if="products.length > 0" class="w-full bg-white rounded-3xl shadow-md">
    <TableList :headerList="headerList">
      <tr v-for="product in products" :key="product.id">
        <th>
          <div class="aspect-square h-8">
            <img :src="product.imgUrl" :alt="product.name" />
          </div>
        </th>
        <td class="font-semibold text-gray-900">{{ product.name }}</td>
        <td class="font-medium text-gray-600">{{ formatPrice(product.price) }}</td>
        <td class="font-semibold text-gray-600">
          <div class="flex gap-2 items-center">
            <button
              :disabled="!isEditQuantity"
              class="btn btn-xs"
              @click="handleSubstractToCart(product.id)"
            >
              -
            </button>
            <span>{{ cartProducts.filter((cart) => cart === product.id).length }}</span>
            <button
              :disabled="!isEditQuantity"
              class="btn btn-xs"
              @click="handleAddToCart([product.id])"
            >
              +
            </button>
          </div>
        </td>
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
</template>
