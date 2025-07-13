<template>
  <div v-if="component">
    <router-link to="/builder" class="text-white bg-gray-400 hover:text-black inline-block mb-6">
      ← Retour au configurateur
    </router-link>

    <h1 class="text-4xl font-bold mb-6">{{ component.name }}</h1>

    <div class="flex flex-col md:flex-row  shadow-md rounded-lg p-6">
      <div class="md:w-1/2 flex justify-center bg-white items-center mb-6 md:mb-0">
        <img
          :src="component.imgUrl || 'https://via.placeholder.com/250'"
          alt="Image du composant"
          class="max-w-xs"
        />
      </div>
      <div class="md:w-1/2 md:pl-10 space-y-4">
        <p class="text-gray-700">
          {{ component.description || 'Description indisponible.' }}
        </p>

        <ul class="list-disc list-inside text-gray-800">
          <li v-for="(line, i) in formattedSpecs" :key="i">{{ line }}</li>
        </ul>

        <div class="mt-6">
          <button class="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold px-6 py-3 rounded-full">
            {{ formatPrice(component.price) }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getComponentById } from '@/services/ComponentAPI.ts'

const route = useRoute()
const component = ref<any>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    const data = await getComponentById(id)

    if (!data) {
      console.error('Aucun composant trouvé')
      return
    }

    component.value = data
  } catch (error) {
    console.error('Erreur de chargement du composant', error)
  }
})

const formattedSpecs = computed(() => {
  if (!component.value?.specs) return []
  return Object.entries(component.value.specs).map(
    ([key, value]) => `${key} : ${Array.isArray(value) ? value.join(', ') : value}`
  )
})

function formatPrice(price: any) {
  const p = typeof price === 'string' ? parseFloat(price) : price
  return p ? `${p.toFixed(2)} €` : 'Prix indisponible'
}
</script>
