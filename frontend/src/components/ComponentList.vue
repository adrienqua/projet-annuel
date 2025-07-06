<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  components: Component[]
  type?: string
  handleSelectComponent?: (component: Component) => void
  handleRemoveComponent?: (component: Component, type: string) => void
}>()
</script>

<template>
  <ul class="flex flex-col mb-3 gap-2">
    <li
      v-for="component in components"
      :key="component.id"
      class="flex justify-between items-center"
      @click="handleSelectComponent && handleSelectComponent(component)"
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
      <button
        class="mr-1 cursor-pointer"
        v-if="handleRemoveComponent && type"
        @click="handleRemoveComponent(component, type)"
      >
        <XMarkIcon class="w-6 h-6" />
      </button>
    </li>
  </ul>
</template>
