<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getComponentById, getComponentBySlug } from '@/services/ComponentAPI.ts'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'
import type { Component } from '@/components/types/component'
import { toast } from 'vue3-toastify'
import Loader from '@/components/ui/Loader.vue'
import type { ComponentType } from '@/components/types/componentType'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Nos produits | BuildMyPC',
  meta: [
    {
      name: 'description',
      content:
        'Parcourez nos catégories de composants PC et trouvez les meilleurs produits pour votre configuration personnalisée.',
    },
    { property: 'og:title', content: 'Nos produits | BuildMyPC' },
    {
      property: 'og:description',
      content:
        'Parcourez nos catégories de composants PC et trouvez les meilleurs produits pour votre configuration personnalisée.',
    },
    { property: 'og:type', content: 'product' },
    { property: 'og:locale', content: 'fr_FR' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'BuildMyPC' },
  ],
})

const cartStore = useCartStore()
const categories = ref<ComponentType[]>([])

onMounted(async () => {
  try {
    const data = await getComponentTypes()
    categories.value = data
  } catch (error) {
    console.error(error)
  }
})

const handleAddToCart = (component: Component) => {
  cartStore.handleAddToCart([component.id])

  toast.success(`${component.name} ajouté au panier`)
}
</script>

<template>
  <div class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat text-3xl font-black mb-6">Nos produits</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        :to="`/products/${category.slug}`"
        v-for="category in categories"
        :key="category.id"
        class="rounded-3xl p-4 bg-white shadow-sm h-[150px] flex items-center justify-center group"
      >
        <h2 class="font-bold text-xl group-hover:text-2xl transition-all duration-200">
          {{ category.name }}
        </h2>
      </router-link>
    </div>
  </div>
</template>
