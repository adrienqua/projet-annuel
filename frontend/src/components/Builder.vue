<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import ComponentList from './ComponentList.vue'

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)
const test = ref('test')

const componentTypes = ref<ComponentType[]>([])
const selectedComponents = reactive<Record<string, Component[]>>({
  cpu: [],
  gpu: [],
  ram: [],
  motherboard: [],
  cpuCooler: [],
  storage: [],
  case: [],
  powerSupply: [],
  caseFan: [],
})
const selectedType = reactive({
  name: '' as string,
  type: '' as string,
  components: [] as Component[],
})

onMounted(async () => {
  componentTypes.value = await getComponentTypes()
})

onMounted(() => {
  console.log('Access child template element:', modalRef.value)
})

const openModal = () => {}

const handleSelectType = (type: ComponentType) => {
  selectedType.components = type.components || []
  selectedType.type = type.reference
  selectedType.name = type.name

  modalRef.value?.open()
}

const handleSelectComponent = (component: Component) => {
  console.log('push component:', component)
  selectedComponents[selectedType.type].push(component)
  modalRef.value?.close()
  console.log('Selected components:', selectedComponents)
}
</script>

<template>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col md:flex-row gap-8 items-start">
    <div class="w-full md:w-3/4 bg-white rounded-3xl shadow-md p-6">
      <h2 class="font-extrabold text-2xl mb-6">Composants</h2>
      <div
        v-for="type in componentTypes"
        :key="type.id"
        @click="handleSelectType(type)"
        class="cursor-pointer"
      >
        <div class="bg-primary text-white px-6 py-4 text-xl font-semibold rounded-3xl group">
          <div class="flex justify-between items-center">
            <h2>{{ type.name }}</h2>
            <button
              class="text-secondary cursor-pointer transition-all duration-300 group-hover:translate-x-1"
            >
              <PlusIcon class="w-8 h-8" />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4 px-6 mt-2 font-medium">
          <ComponentList :components="selectedComponents[type.reference]" />
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/4 bg-white p-6 rounded-3xl shadow-md min-h-5rem">
      <h2 class="font-extrabold text-2xl mb-6">Récapitulatif</h2>
      <button class="btn btn-secondary rounded-3xl w-full">Enregistrer la config</button>
    </div>
  </div>

  <Modal ref="modalRef" title="Sélectionner un composant">
    <ComponentList
      :components="selectedType.components"
      :handleSelectComponent="handleSelectComponent"
    />
  </Modal>
</template>
