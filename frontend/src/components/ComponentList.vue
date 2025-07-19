<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref, watch } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{
  components: Component[]
  type?: ComponentType
  handleSelectComponent?: (component: Component, isEdit: boolean) => void
  handleRemoveComponent?: (component: Component, type: string) => void
  handleSelectType?: (type: ComponentType, index: number) => void
  isEdit?: boolean
  isSelect?: boolean
  selectedComponents?: Record<string, { maxQuantity: number; components: Component[] }>
  selectedType?: string
}>()

const componentsList = ref<Component[]>([])

// Check components compatibility
watch(
  () => props.components,
  (components) => {
    if (!props.isSelect) return
    const selectedCpu = props?.selectedComponents?.cpu?.components?.[0]
    const selectedMotherboard = props?.selectedComponents?.motherboard?.components?.[0]
    const selectedRam = props?.selectedComponents?.ram?.components?.[0]
    const selectedCase = props?.selectedComponents?.case?.components?.[0]
    const selectedPsu = props?.selectedComponents?.powerSupply?.components?.[0]
    const selectedCpuCooler = props?.selectedComponents?.cpuCooler?.components?.[0]

    componentsList.value = components.map((component) => {
      component.disabled = false
      // CPU and motherboard socket compatibility check
      if (
        (props.selectedType === 'motherboard' || props.selectedType === 'cpu') &&
        ((selectedCpu &&
          component.specs?.socket &&
          selectedCpu.specs?.socket !== component.specs?.socket) ||
          (selectedMotherboard &&
            component.specs?.socket &&
            selectedMotherboard.specs?.socket !== component.specs?.socket))
      ) {
        component.disabled = true
      }

      // RAM compatibility check - only check when motherboard is selected
      if (
        props.selectedType === 'ram' &&
        selectedMotherboard &&
        component.specs?.type &&
        selectedMotherboard.specs?.memory_support !== component.specs?.type
      ) {
        component.disabled = true
      }

      // Motherboard RAM compatibility check - only check when RAM is selected
      if (
        props.selectedType === 'motherboard' &&
        selectedRam &&
        component.specs?.memory_support &&
        selectedRam.specs?.type !== component.specs?.memory_support
      ) {
        component.disabled = true
      }

      // Case PSU compatibility check - only check when PSU is selected
      if (
        props.selectedType === 'case' &&
        selectedPsu &&
        component.specs?.compatible_psu_form_factors &&
        !component.specs.compatible_psu_form_factors.includes(selectedPsu.specs?.form_factor)
      ) {
        component.disabled = true
      }

      // PSU case compatibility check - only check when case is selected
      if (
        props.selectedType === 'powerSupply' &&
        selectedCase &&
        selectedCase.specs?.compatible_psu_form_factors &&
        !selectedCase.specs.compatible_psu_form_factors.includes(component.specs?.form_factor)
      ) {
        component.disabled = true
      }

      /*       // CPU Cooler radiator size and Case compatibility check
      if (
        props.selectedType === 'cpuCooler' &&
        selectedCase &&
        component.specs?.tdp_W &&
        parseInt(component.specs.tdp_W) > parseInt(selectedCase.specs.aio_max_format_mm)
      ) {
        console.log('cooler', component.specs.tdp_W, '>', selectedCase.specs.aio_max_format_mm)
        component.disabled = true
      }
      console.log('coolerno', component.specs.tdp_W, '>', selectedCase?.specs.aio_max_format_mm)

      // Case CPU Cooler compatibility check - only check when CPU Cooler is selected
      if (
        props.selectedType === 'case' &&
        selectedCpuCooler &&
        component.specs?.aio_max_format_mm &&
        parseInt(selectedCpuCooler.specs.tdp_W) > parseInt(component.specs.aio_max_format_mm)
      ) {
        component.disabled = true
      }
 */
      return component
    })

    console.log('Components updated:', componentsList.value)
  },
  { immediate: true },
)
</script>

<template>
  <ul class="flex flex-col mb-3 gap-2">
    <li
      v-for="(component, index) in isSelect ? componentsList : components"
      :key="component.id"
      class="flex justify-between items-center"
      :class="{
        'opacity-50 cursor-not-allowed': component.disabled,
      }"
      @click="
        handleSelectComponent &&
        !component.disabled &&
        handleSelectComponent(component, isEdit ? true : false)
      "
    >
      <div
        class="flex gap-2 items-center"
        :class="{ 'cursor-not-allowed': component.disabled, 'cursor-pointer': !component.disabled }"
      >
        <img
          :src="component.imgUrl || '/img/components/placeholder.jpg'"
          :alt="component.name"
          class="w-10 h-10 object-cover rounded-lg"
        />
        <div class="flex items-baseline gap-2">
          <span>{{ component.name }}</span>
          <span class="text-sm text-gray-600">({{ component?.manufacturer?.name }})</span>
        </div>
        <div class="text-sm font-medium">{{ formatPrice(component.price) }}</div>
        <div class="text-sm text-secondary-400">En stock</div>
      </div>
      <div class="flex gap-4">
        <button
          class="mr-1 cursor-pointer"
          v-if="isEdit && type"
          @click="handleSelectType && handleSelectType(type, index as number)"
        >
          <PencilIcon class="w-6 h-6" />
        </button>
        <button
          class="mr-1 cursor-pointer"
          v-if="handleRemoveComponent && type"
          @click="handleRemoveComponent(component, type.reference)"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </li>
  </ul>
</template>
