<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Carrier } from '@/components/types/carrier'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{
  carriers: Carrier[]
  modelValue: Carrier | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Carrier | null): void
}>()

const selectedCarrier = ref<Carrier | null>(props.modelValue)

watch(selectedCarrier, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
<template>
  <div class="w-full md:w-1/2 bg-white rounded-3xl shadow-md p-6">
    <h2 class="font-montserrat font-black text-xl">Livraison</h2>
    <p class="font-montserrat font-bold text-sm text-gray-500 mb-3">Choisissez un transporteur</p>
    <div class="flex flex-col gap-2 mt-4">
      <div class="flex flex-col gap-2">
        <div v-for="carrier in carriers" :key="carrier.id" class="flex items-center gap-2">
          <input
            type="radio"
            :id="`carrier-${carrier.id}`"
            name="carrier"
            :value="carrier"
            v-model="selectedCarrier"
            class="radio radio-sm radio-primary"
          />
          <label :for="`carrier-${carrier.id}`" class="cursor-pointer flex gap-2 items-center">
            <span class="font-medium">{{ carrier.name }}</span>
            <span class="text-gray-700 text-sm font-medium">{{ formatPrice(carrier.price) }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
