<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import ComponentList from './ComponentList.vue'
import { createBuild } from '@/services/BuildAPI'
import { useAuth } from '@/stores/auth'
import type { User } from './types/user'
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'vue3-toastify'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ArrowPathIcon, ServerStackIcon } from '@heroicons/vue/24/outline'

const auth = useAuth()
const cart = useCartStore()
const user = auth.user as User

const router = useRouter()

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)

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
    const total = selectedComponentsList.value.reduce((total, component) => {
      return total + parseFloat(component.price) * 100
    }, 0)
    return total / 100
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

  const parseSelectedComponents = JSON.parse(localStorage.getItem('selectedComponents') || 'null')
  if (parseSelectedComponents) {
    selectedComponents.value = parseSelectedComponents
  }
  console.log('fes', parseSelectedComponents)
})

onMounted(() => {
  console.log('user', user)
})

watch(
  () => selectedComponents.value,
  (selectedComponents) => {
    selectedComponentsList.value = []
    Object.keys(selectedComponents).forEach((key) => {
      selectedComponentsList.value.push(...selectedComponents[key].components)
    })

    localStorage.setItem('selectedComponents', JSON.stringify(selectedComponents))

    console.log('Selected components updated:', selectedComponentsList)
  },
  { deep: true },
)

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

const handleSaveBuild = async (type = 'save') => {
  if (!user.id) {
    router.push('/account').then(() => {
      toast.error('Vous devez être connecté pour enregistrer une configuration.')
    })
      return
  }

  await createBuild({
    name: 'Ma configuration',
    price: totalPrice.value.toString(),
    userId: user.id,
    items: selectedComponentsList.value.map((component) => ({
      componentId: component.id,
      quantity: 1,
      price: component.price,
    })),
  })

  for (const key in selectedComponents.value) {
    selectedComponents.value[key].components = []
  }

  if (type === 'save') {
    router.push('/account').then(() => {
      toast.success('Configuration enregistrée avec succès !')
    })
  } else if (type === 'addToCart') {
    cart.handleAddToCart(selectedComponentsList.value.map((c) => c.id))

    router.push('/cart').then(() => {
      toast.success('Configuration ajoutée au panier avec succès !')
    })
  }
}

const handleResetBuild = () => {
  for (const key in selectedComponents.value) {
    selectedComponents.value[key].components = []
  }

  toast.success('La configuration a bien été réinitialisée !')
}

const isQuantityMaxxed = (type: string): boolean => {
  return (
    selectedComponents.value[type]?.components?.length >=
    selectedComponents.value[type]?.maxQuantity
  )
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="font-montserrat font-black text-3xl mb-6">Configurateur</h1>
    <button type="button" class="btn btn-sm bg-gray-200" @click="handleResetBuild">
      <ArrowPathIcon class="w-5 h-5" />
      Réinitialiser
    </button>
  </div>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col md:flex-row gap-8 items-start">
    <div class="w-full md:w-3/4 bg-white rounded-3xl shadow-md p-6">
      <h2 class="font-montserrat font-black text-xl mb-6">Composants</h2>
      <div v-for="type in componentTypes" :key="type.id">
        <div
          class="bg-primary-950 text-white px-6 py-3.5 text-md font-montserrat font-semibold rounded-3xl group"
          :class="`${!isQuantityMaxxed(type.reference) && 'cursor-pointer'}`"
          @click="isQuantityMaxxed(type.reference) ? null : handleSelectType(type)"
        >
          <div class="flex justify-between items-center">
            <h2>{{ type.name }}</h2>
            <button
              class="text-secondary-400 cursor-pointer transition-all duration-300 group-hover:translate-x-1"
              v-if="!isQuantityMaxxed(type.reference)"
            >
              <PlusIcon class="w-7 h-7" />
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
    <div class="w-full md:w-80 bg-white p-6 rounded-3xl shadow-md min-h-5rem">
      <h2 class="font-montserrat font-black text-xl mb-4">Récapitulatif</h2>
      <ul>
        <li v-for="component in selectedComponentsList" :key="component.id" class="mb-4">
          <div class="flex justify-between">
            <span class="font-medium">{{ component.name }}</span>
            <span class="min-w-20">{{ formatPrice(component.price) }}</span>
          </div>
        </li>
      </ul>
      <div>
        <div class="flex justify-between items-center mb-4 text-md">
          <span class="font-montserrat font-extrabold">Total</span>
          <span class="text-secondary-400 font-montserrat font-extrabold">{{
            formatPrice(totalPrice)
          }}</span>
        </div>
      </div>
      <button
        class="btn rounded-3xl w-full mb-3"
        @click="handleSaveBuild('save')"
        :disabled="selectedComponentsList.length === 0"
      >
        <ServerStackIcon class="w-5 h-5 mr-2" />
        Enregistrer la config
      </button>
      <button
        class="btn btn-secondary rounded-3xl w-full"
        @click="handleSaveBuild('addToCart')"
        :disabled="selectedComponentsList.length === 0"
      >
        <ShoppingCartIcon class="w-5 h-5 mr-2" />
        Ajouter au panier
      </button>
    </div>
  </div>

  <Modal ref="modalRef" title="Sélectionner un composant" class="font-medium">
    <ComponentList
      :components="selectedType.components"
      :handleSelectComponent="handleSelectComponent"
      :isEdit="isQuantityMaxxed(selectedType?.type) ? true : false"
      :selectedComponents="selectedComponents"
      :selectedType="selectedType.type"
      :isSelect="true"
    />
  </Modal>
</template>
