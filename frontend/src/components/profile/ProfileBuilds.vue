<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'
import type { Build } from '../types/build'

const props = defineProps<{
  builds: Build[]
}>()
</script>
<template>
  <div class="mt-6">
    <h2 class="text-xl font-montserrat font-black mb-4">Mes configurations</h2>
    <div v-if="builds.length === 0"><Loader /></div>
    <div v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-if="builds"
          v-for="build in builds"
          :key="build.id"
          class="mb-2 bg-white rounded-3xl p-6 shadow-md"
        >
          <div class="flex justify-between">
            <h3 class="text-gray-800 font-semibold mb-3">
              {{ build.name }}
            </h3>
            <span class="text-secondary-400 font-semibold">{{ formatPrice(build.price) }}</span>
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
