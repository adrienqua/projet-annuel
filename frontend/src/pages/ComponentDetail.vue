<template>
  <div v-if="component">
    <h1 class="text-2xl font-bold mb-4">{{ component.name }}</h1>
    <p><strong>Type:</strong> {{ component.type?.name }}</p>
    <p><strong>Manufacturer:</strong> {{ component.manufacturer?.name }}</p>
    <pre class="bg-gray-100 p-4 mt-4 rounded">
      <code>{{ component.specs }}</code>
    </pre>
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getComponentById } from '@/services/ComponentAPI.ts'

const route = useRoute()
const component = ref<any>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    component.value = await getComponentById(id)
  } catch (error) {
    console.error('Erreur de chargement du composant')
  }
})
</script>
