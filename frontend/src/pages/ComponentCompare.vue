<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { getAllComponents } from '@/services/ComponentAPI'
import { compareComponents } from '@/services/CompareAPI'

const allComponents = ref<any[]>([])
const leftSelected = ref<any | null>(null)
const rightSelected = ref<any | null>(null)
const comparisonResult = ref<any | null>(null)

const filteredRight = computed(() => {
  if (!leftSelected.value) return []
  return allComponents.value.filter(
    (comp) => comp.id !== leftSelected.value.id && comp.typeId === leftSelected.value.typeId
  )
})

onMounted(async () => {
  allComponents.value = await getAllComponents()
})

const compare = async () => {
  if (!leftSelected.value || !rightSelected.value) return
  const result = await compareComponents(leftSelected.value.id, rightSelected.value.id)
  comparisonResult.value = result
}

watch(leftSelected, () => {
  if (
    rightSelected.value &&
    rightSelected.value.typeId !== leftSelected.value?.typeId
  ) {
    rightSelected.value = null
  }
  comparisonResult.value = null
})

watch(rightSelected, () => {
  comparisonResult.value = null
})

function formatSpecs(specs: Record<string, any>) {
  if (!specs) return []
  return Object.entries(specs).map(([key, val]) => `${key} : ${Array.isArray(val) ? val.join(', ') : val}`)
}

function formatPrice(price: any) {
  const p = typeof price === 'string' ? parseFloat(price) : price
  return p ? `${p.toFixed(2)} €` : 'Prix indisponible'
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Comparateur de composants</h1>

    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-1/2">
        <h2 class="text-xl font-semibold mb-2">Composant A</h2>
        <select v-model="leftSelected" class="w-full p-2 border rounded">
          <option :value="null" disabled>Choisir un composant</option>
          <option v-for="c in allComponents" :key="c.id" :value="c">
            {{ c.name }} ({{ c.type.name }})
          </option>
        </select>

        <div v-if="leftSelected" class="mt-4 p-4 border rounded shadow text-sm bg-white">
          <div class="flex gap-4">
            <img
              :src="leftSelected.imgUrl || 'https://via.placeholder.com/100'"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
              alt="image"
            />
            <div class="flex-1">
              <p class="font-bold">{{ leftSelected.name }}</p>
              <p class="text-gray-600">{{ leftSelected.manufacturer?.name || 'Fabricant inconnu' }}</p>
              <ul class="mt-2 list-disc list-inside text-gray-700">
                <li v-for="(line, i) in formatSpecs(leftSelected.specs)" :key="i">{{ line }}</li>
              </ul>
              <p class="mt-2 font-semibold text-green-600">{{ formatPrice(leftSelected.price) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <h2 class="text-xl font-semibold mb-2">Composant B</h2>
        <select v-model="rightSelected" class="w-full p-2 border rounded" :disabled="!leftSelected">
          <option :value="null" disabled>Choisir un composant</option>
          <option v-for="c in filteredRight" :key="c.id" :value="c">
            {{ c.name }}
          </option>
        </select>

        <div v-if="rightSelected" class="mt-4 p-4 border rounded shadow text-sm bg-white">
          <div class="flex gap-4">
            <img
              :src="rightSelected.imgUrl || 'https://via.placeholder.com/100'"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
              alt="image"
            />
            <div class="flex-1">
              <p class="font-bold">{{ rightSelected.name }}</p>
              <p class="text-gray-600">{{ rightSelected.manufacturer?.name || 'Fabricant inconnu' }}</p>
              <ul class="mt-2 list-disc list-inside text-gray-700">
                <li v-for="(line, i) in formatSpecs(rightSelected.specs)" :key="i">{{ line }}</li>
              </ul>
              <p class="mt-2 font-semibold text-green-600">{{ formatPrice(rightSelected.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        :disabled="!leftSelected || !rightSelected"
        @click="compare"
      >
        Comparer
      </button>
    </div>

    <div v-if="comparisonResult" class="mt-10 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800">Résultat de la comparaison</h2>

      <div class="grid grid-cols-2 gap-4 items-center">
        <!-- Composant A -->
        <div class="p-4 border rounded bg-gray-50 relative">
          <h3 class="text-lg font-bold mb-2 text-gray-700 text-center">{{ leftSelected.name }}</h3>
          <img
            :src="leftSelected.imgUrl || 'https://via.placeholder.com/100'"
            class="mx-auto w-24 h-24 object-contain mb-2"
            alt="image A"
          />
          <p class="text-center text-green-600 text-lg font-semibold">{{ comparisonResult.score1 }}</p>
          <div
            v-if="comparisonResult.score1 > comparisonResult.score2"
            class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow"
          >
            Gagnant
          </div>
        </div>
        <div class="p-4 border rounded bg-gray-50 relative">
          <h3 class="text-lg font-bold mb-2 text-gray-700 text-center">{{ rightSelected.name }}</h3>
          <img
            :src="rightSelected.imgUrl || 'https://via.placeholder.com/100'"
            class="mx-auto w-24 h-24 object-contain mb-2"
            alt="image B"
          />
          <p class="text-center text-green-600 text-lg font-semibold">{{ comparisonResult.score2 }}</p>
          <div
            v-if="comparisonResult.score2 > comparisonResult.score1"
            class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow"
          >
            Gagnant
          </div>
        </div>
      </div>

      <!-- Résumé -->
      <div class="mt-6 text-center">
        <p class="text-lg font-medium text-gray-800">
          {{ comparisonResult.result }}
        </p>
      </div>
    </div>
  </div>
</template>
