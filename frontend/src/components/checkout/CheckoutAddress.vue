<script setup lang="ts">
import type { Address } from '@/components/types/address'
import { watch, ref } from 'vue'

const props = defineProps<{
  addresses: Address[]
  modelValue: Address | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Address | null): void
}>()

const selectedAddress = ref<Address | null>(props.modelValue)

watch(selectedAddress, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
<template>
  <div class="w-full md:w-1/2 bg-white rounded-3xl shadow-md p-6">
    <h2 class="font-montserrat font-black text-xl">Adresse</h2>
    <p class="font-montserrat font-bold text-sm text-gray-500 mb-3">Sélectionnez une adresse</p>
    <div class="flex flex-col gap-2 mt-4">
      <div v-for="address in addresses" :key="address.id" class="flex items-center gap-2">
        <input
          type="radio"
          :id="`address-${address.id}`"
          name="address"
          :value="address"
          v-model="selectedAddress"
          class="radio radio-sm radio-primary"
        />
        <label :for="`address-${address.id}`" class="cursor-pointer">
          <span class="font-medium">{{ address.label }}</span>
          <div
            class="flex flex-col text-sm text-gray-700 font-medium"
            v-if="selectedAddress === address"
          >
            <span>{{ address.name }}</span>
            <span>{{ address.address }}, {{ address.postalCode }} {{ address.city }}</span>
            <span>{{ address.country }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
