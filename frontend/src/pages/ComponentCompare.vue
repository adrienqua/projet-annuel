<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Comparer deux composants</h1>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div>
        <label for="comp1" class="block font-medium mb-2">Composant 1 :</label>
        <select v-model="compId1" class="w-full border rounded p-2">
          <option disabled value="">Sélectionnez un composant</option>
          <option v-for="comp in components" :key="comp.id" :value="comp.id">
            {{ comp.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="comp2" class="block font-medium mb-2">Composant 2 :</label>
        <select v-model="compId2" class="w-full border rounded p-2">
          <option disabled value="">Sélectionnez un composant</option>
          <option v-for="comp in components" :key="comp.id" :value="comp.id">
            {{ comp.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="comp1 && comp2" class="grid grid-cols-2 gap-8">
      <ComponentCard :component="comp1" />
      <ComponentCard :component="comp2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getComponentById, getAllComponents } from '@/services/ComponentAPI'
import ComponentCard from '@/components/ComponentCard.vue'

const components = ref<any[]>([])
const compId1 = ref<number | null>(null)
const compId2 = ref<number | null>(null)
const comp1 = ref<any | null>(null)
const comp2 = ref<any | null>(null)

onMounted(async () => {
  components.value = await getAllComponents()
})

watch(compId1, async (newId) => {
  if (newId) comp1.value = await getComponentById(newId)
})
watch(compId2, async (newId) => {
  if (newId) comp2.value = await getComponentById(newId)
})
</script>
