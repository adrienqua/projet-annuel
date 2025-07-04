<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const componentTypes = ref<ComponentType[]>([])
const selectedComponent = reactive({
  cpu: '',
  gpu: '',
  ram: '',
  motherboard: '',
  cpuCooler: '',
  storage: '',
  case: '',
  powerSupply: '',
  caseFan: '',
})

onMounted(async () => {
  componentTypes.value = await getComponentTypes()
})

const handleSelectedComponent = (componentType: string, component: Component) => {
  // @ts-ignore
  selectedComponent[componentType] = component
  console.log('ef')
}
</script>

<template>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col gap-4">
    <div v-for="type in componentTypes" :key="type.id">
      <div class="bg-primary text-white px-6 py-4 text-xl font-semibold rounded-3xl">
        <div class="flex justify-between items-center">
          <h2>{{ type.name }}</h2>
          <button class="text-secondary">
            <PlusIcon class="w-8 h-8" />
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 px-6 mt-2 font-medium">
        <ul v-for="component in type.components" :key="component.id" class="">
          <li
            class="flex gap-2 items-baseline"
            @click="handleSelectedComponent(type.reference, component)"
          >
            <div>
              {{ component.name }}
              <span class="text-sm text-gray-600">({{ component?.manufacturer?.name }})</span>
            </div>
            <div class="text-sm text-secondary">En stock</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Modal> </Modal>
</template>
