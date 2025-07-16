<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{
  subTotal: number
}>()
</script>
<template>
  <div class="w-full md:w-1/4 bg-white rounded-3xl shadow-md p-6">
    <h2 class="font-montserrat font-black text-xl mb-4">Ma commande</h2>
    <div class="w-full flex flex-col items-center gap-4">
      <div class="flex justify-between w-full">
        <span class="font-medium text-gray-800">Sous total : </span>
        <span class="font-medium">{{ formatPrice(subTotal) }}</span>
      </div>
      <router-link to="/checkout" class="btn btn-secondary w-full">Commander</router-link>
    </div>
  </div>
</template>
