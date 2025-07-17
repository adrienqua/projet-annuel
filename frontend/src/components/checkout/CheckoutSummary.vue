<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Carrier } from '@/components/types/carrier'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{
  subTotal: number
  totalPrice: number
  isPayment: boolean
  selectedCarrier: Carrier | null
  handleCheckoutSubmit: () => void
}>()
</script>
<template>
  <div class="w-full md:w-1/4 bg-white rounded-3xl shadow-md p-6">
    <h2 class="font-montserrat font-black text-xl mb-4">Paiement</h2>
    <div class="w-full flex flex-col items-center gap-4">
      <div class="flex flex-col gap-1 w-full">
        <div class="flex justify-between w-full">
          <span class="font-medium text-gray-800">Sous total : </span>
          <span class="font-medium">{{ formatPrice(subTotal) }}</span>
        </div>
        <div class="flex justify-between w-full">
          <span class="font-medium text-gray-800">Livraison : </span>
          <span class="font-medium">{{ formatPrice(Number(selectedCarrier?.price || 0)) }}</span>
        </div>
        <hr class="my-1 border-gray-100 mx-2" />
        <div class="flex justify-between w-full">
          <span class="font-bold text-gray-800">Total : </span>
          <span class="font-bold">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
      <button
        @click="handleCheckoutSubmit"
        class="btn btn-secondary w-full"
        :class="{ 'btn-disabled': !isPayment }"
      >
        Passer au paiement
      </button>
    </div>
  </div>
</template>
