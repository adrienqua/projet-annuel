<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Component } from '@/components/types/component'
import { getComponents } from '@/services/ComponentAPI'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'
import Loader from '@/components/ui/Loader.vue'
import TableList from '@/components/ui/TableList.vue'
import { getCart } from '@/services/CartAPI'
import Cart from '@/components/cart/Cart.vue'
import CartSummary from '@/components/cart/CartSummary.vue'

const { cartProducts } = useCartStore()

const products = ref<Component[]>([])

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
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat font-black text-3xl mb-6">
      Panier
      <span class="text-gray-700 text-xl font-bold">({{ cartProducts.length }})</span>
    </h1>
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <div class="w-full md:w-3/4">
        <Cart :products="products" :isEditQuantity="true" />
      </div>
      <CartSummary :subTotal="subTotal" />
    </div>
  </main>
</template>
