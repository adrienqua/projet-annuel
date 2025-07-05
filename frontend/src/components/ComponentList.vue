<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  components: Component[]
  handleSelectComponent?: (component: Component) => void
}>()
</script>

<template>
  <ul class="flex flex-col mb-3 gap-2">
    <li
      v-for="component in components"
      :key="component.id"
      class="flex gap-2 items-center cursor-pointer"
      @click="handleSelectComponent && handleSelectComponent(component)"
    >
      <img
        :src="component.img_url || '/img/components/placeholder.jpg'"
        alt="Component Image"
        class="w-10 h-10 object-cover rounded-lg"
      />
      <div class="flex items-baseline gap-2">
        <span>{{ component.name }}</span>
        <span class="text-sm text-gray-600">({{ component?.manufacturer?.name }})</span>
      </div>
      <div class="text-sm font-medium">299 €</div>
      <div class="text-sm text-secondary">En stock</div>
    </li>
  </ul>
</template>
