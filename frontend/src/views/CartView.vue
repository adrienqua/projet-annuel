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
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Panier | BuildMyPC',
  meta: [
    {
      name: 'description',
      content:
        'Consultez le récapitulatif de votre configuration PC sur mesure. Modifiez vos composants, vérifiez les prix et passez à la commande en toute simplicité.',
    },
    { property: 'og:title', content: 'Panier | BuildMyPC' },
    {
      property: 'og:description',
      content:
        'Votre panier contient votre configuration PC complète. Finalisez votre commande ou continuez votre assemblage avec BuildMyPC.',
    },
    { property: 'og:type', content: 'product' },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:url', content: 'https://buildmypc.fr/panier' },
    { property: 'og:image', content: 'https://buildmypc.fr/images/meta-panier.jpg' },
    { name: 'robots', content: 'index, follow' },
    {
      name: 'keywords',
      content: 'panier PC, configuration PC, commande PC, composants PC, build my pc, config gamer',
    },
    { name: 'author', content: 'BuildMyPC' },
  ],
})

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

const handleResetCart = () => {
  useCartStore().handleEmptyCart()
  products.value = []
}
</script>

<template>
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <div class="flex justify-between items-center mb-6">
      <h1 class="font-montserrat font-black text-3xl">
        Panier
        <span class="text-gray-700 text-xl font-bold">({{ cartProducts.length }})</span>
      </h1>
      <button type="button" class="btn btn-sm bg-gray-200" @click="handleResetCart">
        <TrashIcon class="w-4 h-4" />
        Vider le panier
      </button>
    </div>
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <div class="w-full md:w-3/4">
        <Cart :products="products" :isEditQuantity="true" />
      </div>
      <CartSummary :subTotal="subTotal" />
    </div>
  </main>
</template>
