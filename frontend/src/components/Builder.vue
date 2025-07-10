<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { computed, onMounted, reactive, ref, watch } from 'vue'
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
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'vue3-toastify'

const auth = useAuth()
const user = auth.user as User

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)
const test = ref('test')

const componentTypes = ref<ComponentType[]>([])
const selectedComponents = ref<Record<string, { maxQuantity: number; components: Component[] }>>({
  cpu: {
    maxQuantity: 1,
    components: [],
  },
  gpu: {
    maxQuantity: 1,
    components: [],
  },
  ram: {
    maxQuantity: 1,
    components: [],
  },
  motherboard: {
    maxQuantity: 1,
    components: [],
  },
  cpuCooler: {
    maxQuantity: 1,
    components: [],
  },
  storage: {
    maxQuantity: 3,
    components: [],
  },
  case: {
    maxQuantity: 1,
    components: [],
  },
  powerSupply: {
    maxQuantity: 1,
    components: [],
  },
  caseFans: {
    maxQuantity: 7,
    components: [],
  },
})
const selectedComponentsList = ref<Component[]>([])

const totalPrice = ref(
  computed(() => {
    return selectedComponentsList.value.reduce((total, component) => {
      return (total * 100 + parseFloat(component.price) * 100) / 100
    }, 0)
  }),
)

const selectedType = reactive({
  name: '' as string,
  type: '' as string,
  activeIndex: 0 as number,
  components: [] as Component[],
})

onMounted(async () => {
  componentTypes.value = await getComponentTypes()
})

onMounted(() => {
  console.log('user', user)
})

watch(selectedComponents.value, (selectedComponents) => {
  selectedComponentsList.value = []
  Object.keys(selectedComponents).forEach((key) => {
    selectedComponentsList.value.push(...selectedComponents[key].components)
  })

  console.log('Selected components updated:', selectedComponentsList)
})

const handleSelectType = (type: ComponentType, index?: number) => {
  selectedType.components = type.components || []
  selectedType.type = type.reference
  selectedType.name = type.name
  if (index) {
    selectedType.activeIndex = index
  }

  modalRef.value?.open()
}

const handleSelectComponent = (component: Component, isEdit: boolean) => {
  console.log('Selected component:', isEdit, selectedType.activeIndex)
  if (isEdit) {
    selectedComponents.value[selectedType.type].components.splice(
      selectedType.activeIndex,
      1,
      component,
    )
  } else {
    selectedComponents.value[selectedType.type].components.push(component)
  }
  modalRef.value?.close()
}

const handleRemoveComponent = (component: Component, type: string) => {
  const index = selectedComponents.value[type].components.indexOf(component)
  if (index > -1) {
    selectedComponents.value[type].components.splice(index, 1)
  }
}

const handleSaveBuild = async () => {
  await createBuild({
    name: 'Ma configuration',
    price: totalPrice.value.toString(),
    userId: user.id,
    items: selectedComponentsList.value.map((component) => ({
      componentId: component.id,
      quantity: 1,
      price: '299.90',
    })),
  })

  toast('Configuration sauvegardée avec succès !')
}

const isQuantityMaxxed = (type: string): boolean => {
  return (
    selectedComponents.value[type]?.components?.length >=
    selectedComponents.value[type]?.maxQuantity
  )
}
</script>

<template>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col md:flex-row gap-8 items-start">
    <div class="w-full md:w-3/4 bg-white rounded-3xl shadow-md p-6">
      <h2 class="font-extrabold text-2xl mb-6">Composants</h2>
      <div v-for="type in componentTypes" :key="type.id">
        <div
          class="bg-primary-950 text-white px-6 py-4 text-xl font-semibold rounded-3xl group"
          :class="`${!isQuantityMaxxed(type.reference) && 'cursor-pointer'}`"
          @click="isQuantityMaxxed(type.reference) ? null : handleSelectType(type)"
        >
          <div class="flex justify-between items-center">
            <h2>{{ type.name }}</h2>
            <button
              class="text-secondary-400 cursor-pointer transition-all duration-300 group-hover:translate-x-1"
              v-if="!isQuantityMaxxed(type.reference)"
            >
              <PlusIcon class="w-8 h-8" />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4 px-6 mt-2 font-medium">
          <ComponentList
            :components="selectedComponents[type.reference].components"
            :type="type"
            :handleRemoveComponent="handleRemoveComponent"
            :handleSelectType="handleSelectType"
            :isEdit="isQuantityMaxxed(type.reference) ? true : false"
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
            <span class="">{{ formatPrice(component.price) }}</span>
          </div>
        </li>
      </ul>
      <div>
        <div class="flex justify-between items-center mb-4 text-lg">
          <span class="font-extrabold">Total</span>
          <span class="text-secondary-400 font-extrabold">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
      <button class="btn btn-secondary-400 rounded-3xl w-full" @click="handleSaveBuild">
        Enregistrer la config
      </button>
    </div>
  </div>

  <Modal ref="modalRef" title="Sélectionner un composant">
    <ComponentList
      :components="selectedType.components"
      :handleSelectComponent="handleSelectComponent"
      :isEdit="isQuantityMaxxed(selectedType?.type) ? true : false"
    />
  </Modal>
</template>
