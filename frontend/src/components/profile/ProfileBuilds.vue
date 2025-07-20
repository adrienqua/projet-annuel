<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'
import type { Build } from '../types/build'
import Cart from '../cart/Cart.vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const { cartProducts, handleAddToCart, handleEmptyCart } = useCartStore()

const router = useRouter()

const handleAddBuildToCart = (build: Build) => {
  handleEmptyCart()
  handleAddToCart(
    build.items.map((item) => item?.component?.id).filter((id): id is number => id !== undefined),
  )
  router.push('/cart').then(() => {
    toast.success('Configuration ajoutée au panier !')
  })
}

const props = defineProps<{
  builds: Build[]
}>()
</script>
<template>
  <div class="mt-6">
    <h2 class="text-xl font-montserrat font-black mb-4">Mes configurations</h2>
    <div v-if="builds.length === 0">
      <p>Vous n'avez pas de configurations.</p>
    </div>
    <div v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-if="builds"
          v-for="build in builds"
          :key="build.id"
          class="mb-2 bg-white rounded-3xl p-6 shadow-md"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex flex-col items-start">
              <h3 class="text-gray-800 font-semibold">
                {{ build.name }}
              </h3>
              <span class="text-secondary-400 font-semibold">{{ formatPrice(build.price) }}</span>
            </div>
            <button class="btn btn-xs btn-primary p-3 px-2.5" @click="handleAddBuildToCart(build)">
              <ShoppingCartIcon class="w-4 h-4" />
            </button>
          </div>
          <ul class="flex flex-col gap-1">
            <li v-for="component in build.items" :key="component.id">
              <div class="flex justify-between items-center gap-2 text-sm">
                <img
                  :src="component?.component?.imgUrl || '/img/components/placeholder.jpg'"
                  :alt="component?.component?.name"
                  class="w-10 h-10 object-cover rounded-lg"
                />
                <span class="text-gray-900 w-3/4">{{ component?.component?.name }}</span>
                <span class="text-gray-500">x{{ component.quantity }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
