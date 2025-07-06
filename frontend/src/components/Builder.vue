<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref, watch } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import ComponentList from './ComponentList.vue'
import { createBuild } from '@/services/BuildAPI'
import { useAuth } from '@/stores/auth'
import type { User } from './types/User'

const auth = useAuth()
const user = auth.user as User

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
  caseFans: [],
})
const selectedComponentsList = ref<Component[]>([])

const selectedType = reactive({
  name: '' as string,
  type: '' as string,
  components: [] as Component[],
})

onMounted(async () => {
  componentTypes.value = await getComponentTypes()
})

onMounted(() => {
  console.log('user', user)
})

watch(selectedComponents, (selectedComponents) => {
  selectedComponentsList.value = []
  Object.keys(selectedComponents).forEach((key) => {
    selectedComponentsList.value.push(...selectedComponents[key])
  })

  console.log('Selected components updated:', selectedComponentsList)
})

const handleSelectType = (type: ComponentType) => {
  selectedType.components = type.components || []
  selectedType.type = type.reference
  selectedType.name = type.name

  modalRef.value?.open()
}

const handleSelectComponent = (component: Component) => {
  selectedComponents[selectedType.type].push(component)
  modalRef.value?.close()
}

const handleRemoveComponent = (component: Component, type: string) => {
  const index = selectedComponents[type].indexOf(component)
  if (index > -1) {
    selectedComponents[type].splice(index, 1)
  }
}

const handleSaveBuild = async () => {
  await createBuild({
    name: 'Ma configuration',
    price: '3999.99',
    user_id: user.id,
    items: selectedComponentsList.value.map((component) => ({
      component_id: component.id,
      quantity: 1,
      price: '299.90',
    })),
  })
}
</script>

<template>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col md:flex-row gap-8 items-start">
    <div class="w-full md:w-3/4 bg-white rounded-3xl shadow-md p-6">
      <h2 class="font-extrabold text-2xl mb-6">Composants</h2>
      <div v-for="type in componentTypes" :key="type.id">
        <div
          class="bg-primary text-white px-6 py-4 text-xl font-semibold rounded-3xl group cursor-pointer"
          @click="handleSelectType(type)"
        >
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
          <ComponentList
            :components="selectedComponents[type.reference]"
            :type="type.reference"
            :handleRemoveComponent="handleRemoveComponent"
          />
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/4 bg-white p-6 rounded-3xl shadow-md min-h-5rem">
      <h2 class="font-extrabold text-2xl mb-6">Récapitulatif</h2>
      <ul>
        <li v-for="component in selectedComponentsList" :key="component.id" class="mb-4">
          <div class="flex justify-between">
            <span class="font-medium w-3/4">{{ component.name }}</span>
            <span class="">299 €</span>
          </div>
        </li>
      </ul>
      <button class="btn btn-secondary rounded-3xl w-full" @click="handleSaveBuild">
        Enregistrer la config
      </button>
    </div>
  </div>

  <Modal ref="modalRef" title="Sélectionner un composant">
    <ComponentList
      :components="selectedType.components"
      :handleSelectComponent="handleSelectComponent"
    />
  </Modal>
</template>
