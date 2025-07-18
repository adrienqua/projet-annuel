<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'
import type { Order } from '../types/order'
import { formatDate } from '@/utils/formatDate'
import Loader from '../ui/Loader.vue';

const props = defineProps<{
  orders: Order[]
}>()
</script>
<template>
  <div class="mt-6">
    <h2 class="text-xl font-montserrat font-black mb-4">Mes commandes</h2>
    <div v-if="orders.length === 0">
      <p>Vous n'avez pas de commandes.</p>
    </div>
    <div v-else>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-if="orders"
          v-for="order in orders"
          :key="order.id"
          class="mb-2 bg-white rounded-3xl p-6 shadow-md"
        >
          <div class="flex justify-between">
            <h3 class="text-gray-800 font-medium mb-3 flex flex-col items-start gap-2">
              <span class="badge badge-sm badge-neutral">{{ order.status }} </span>
              <span class="text-gray-500 text-xs">{{ formatDate(order.createdAt) }}</span>
            </h3>
            <span class="text-secondary-400 font-semibold">{{ formatPrice(order.total) }}</span>
          </div>
          <ul class="flex flex-col gap-1">
            <li v-for="item in order.orderItems" :key="item.id">
              <div class="flex items-center gap-4 text-sm">
                <img
                  :src="item?.component?.imgUrl || '/img/components/placeholder.jpg'"
                  :alt="item?.component?.name"
                  class="w-10 h-10 object-cover rounded-lg"
                />
                <div class="w-full flex flex-col">
                  <span class="text-gray-900">{{ item.product }} </span>
                  <div class="flex gap-2 text-xs">
                    <span class="text-gray-600">x{{ item.quantity }}</span>
                    <span class="text-gray-600 font-medium">{{ formatPrice(item.price) }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
