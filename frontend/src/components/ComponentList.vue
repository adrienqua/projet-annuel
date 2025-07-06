<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  components: Component[]
  type?: ComponentType
  handleSelectComponent?: (component: Component, isEdit: boolean) => void
  handleRemoveComponent?: (component: Component, type: string) => void
  handleSelectType?: (type: ComponentType, index: number) => void
  isEdit?: boolean
}>()
</script>

<template>
  <ul class="flex flex-col mb-3 gap-2">
    <li
      v-for="(component, index) in components"
      :key="component.id"
      class="flex justify-between items-center"
      @click="handleSelectComponent && handleSelectComponent(component, isEdit ? true : false)"
    >
      <div class="flex gap-2 items-center cursor-pointer">
        <img
          :src="component.img_url || '/img/components/placeholder.jpg'"
          :alt="component.name"
          class="w-10 h-10 object-cover rounded-lg"
        />
        <div class="flex items-baseline gap-2">
          <span>{{ component.name }}</span>
          <span class="text-sm text-gray-600">({{ component?.manufacturer?.name }})</span>
        </div>
        <div class="text-sm font-medium">299 €</div>
        <div class="text-sm text-secondary">En stock</div>
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
