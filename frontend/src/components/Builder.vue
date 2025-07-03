<script setup lang="ts">
import { getComponents } from '@/services/ComponentAPI'
import { onMounted, reactive, ref } from 'vue'
import type { Component } from './types/component'
import { getComponentTypes } from '@/services/ComponentTypeAPI'
import type { ComponentType } from './types/componentType'
import Loader from './ui/Loader.vue'
import Modal from './ui/Modal.vue'

const componentTypes = ref<ComponentType[]>([])

onMounted(async () => {
  componentTypes.value = await getComponentTypes()
})
</script>

<template>
  <div v-if="componentTypes.length === 0"><Loader /></div>
  <div v-else class="flex flex-col gap-4">
    <div v-for="type in componentTypes" :key="type.id">
      <div class="bg-primary text-white px-6 py-4 text-xl font-semibold rounded-3xl">
        <div class="flex justify-between items-center">
          <h2>{{ type.name }}</h2>
          <button class="text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 px-6 mt-2 font-medium">
        <ul v-for="component in type.components" :key="component.id" class="">
          <li>
            {{ component.name }}
            <span class="text-sm text-gray-600">({{ component?.manufacturer?.name }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Modal> </Modal>
</template>
