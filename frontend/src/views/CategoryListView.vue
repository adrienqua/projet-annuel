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
import { getComponentTypeBySlug, getComponentTypes } from '@/services/ComponentTypeAPI'
import { useHead } from '@vueuse/head'

const route = useRoute()
const cartStore = useCartStore()
const category = ref<ComponentType | null>(null)

onMounted(async () => {
  try {
    const slug = route.params.slug
    const data = await getComponentTypeBySlug(slug as string)
    category.value = data
  } catch (error) {
    console.error(error)
  }
})

const handleAddToCart = (component: Component) => {
  cartStore.handleAddToCart([component.id])

  toast.success(`${component.name} ajouté au panier`)
}

useHead(
  computed(() => ({
    title: category.value ? `${category.value.name} | BuildMyPC` : 'BuildMyPC',
    meta: [
      {
        name: 'description',
        content:
          'Parcourez nos catégories de composants PC et trouvez les meilleurs produits pour votre configuration personnalisée.',
      },
      {
        property: 'og:title',
        content: category.value
          ? `${category.value.name} | BuildMyPC`
          : 'Comparateur de composants | BuildMyPC',
      },
      {
        property: 'og:description',
        content:
          'Parcourez nos catégories de composants PC et trouvez les meilleurs produits pour votre configuration personnalisée.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'robots', content: 'index, follow' },
    ],
  })),
)
</script>

<template>
  <div class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat text-3xl font-black mb-6">{{ category?.name }}</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        :to="`/components/${component.slug}`"
        v-for="component in category?.components"
        :key="component.id"
        class="rounded-3xl bg-gray-100 shadow-sm overflow-hidden group"
      >
        <div class="flex flex-col items-center overflow-hidden">
          <img
            :src="component.imgUrl || '/components/placeholder.jpg'"
            :alt="component.name"
            class="object-cover aspect-square group-hover:scale-110 transition-all duration-200"
          />
        </div>
        <div class="flex flex-col items-center p-4">
          <h2 class="font-bold text-lg">{{ component.name }}</h2>
          <p class="text-gray-600">{{ formatPrice(component.price) }}</p>
          <button
            type="button"
            class="btn btn-sm bg-secondary mt-2"
            @click.prevent="handleAddToCart(component)"
          >
            <ShoppingCartIcon class="w-5 h-5 mr-1" />
            Ajouter au panier
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>
