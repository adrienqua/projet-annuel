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
import { useHead } from '@vueuse/head'

const route = useRoute()
const cartStore = useCartStore()
const component = ref<Component | null>(null)

onMounted(async () => {
  try {
    const slug = route.params.slug
    const data = await getComponentBySlug(slug as string)

    if (!data) {
      console.error('Aucun composant trouvé')
      return
    }

    component.value = data
  } catch (error) {
    console.error('Erreur de chargement du composant', error)
  }
})

const handleAddToCart = (component: Component) => {
  cartStore.handleAddToCart([component.id])

  toast.success(`${component.name} ajouté au panier`)
}

useHead(
  computed(() => ({
    title: component.value ? `${component.value.name} | BuildMyPC` : 'BuildMyPC',
    meta: [
      {
        name: 'description',
        content: component.value ? `${component.value.description} | BuildMyPC` : 'BuildMyPC',
      },
      {
        property: 'og:title',
        content: component.value
          ? `${component.value.name} | BuildMyPC`
          : 'Comparateur de composants | BuildMyPC',
      },
      {
        property: 'og:description',
        content: component.value ? `${component.value.description} | BuildMyPC` : 'BuildMyPC',
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
    <div v-if="component">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            :src="component.imgUrl || '/components/placeholder.jpg'"
            :alt="component.name"
            class="rounded-3xl shadow-md"
          />
        </div>
        <div class="md:w-1/2 md:pl-10 space-y-4 rounded-3xl p-8 bg-white shadow-md">
          <h1 class="font-montserrat text-3xl font-black mb-3">{{ component.name }}</h1>
          <p class="text-gray-700 mb-3">
            {{ component.description || 'Description indisponible.' }}
          </p>

          <span class="text-lg text-secondary font-bold mb-6">
            {{ formatPrice(component.price) }}
          </span>

          <div class="mt-6">
            <button @click="handleAddToCart(component)" class="btn btn-secondary rounded-3xl">
              <ShoppingCartIcon class="w-5 h-5 mr-2" />

              Ajouter au panier
            </button>
          </div>
          <h3 class="font-montserrat text-xl font-black mt-12 text-gray-800">Spécifications</h3>
          <div class="overflow-x-auto bg-gray-100 rounded-3xl">
            <table class="table">
              <tbody>
                <tr v-for="(value, key) in component.specs" :key="key">
                  <th>{{ key }}</th>
                  <td>{{ Array.isArray(value) ? value.join(', ') : value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <Loader />
    </div>
  </div>
</template>
