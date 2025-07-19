<script setup lang="ts">
import type { Build } from '../types/build'

const props = defineProps<{
  builds: Build[]
}>()
</script>

<template>
  <div class="mt-16 px-4">
    <h2 class="font-montserrat text-2xl font-black text-center mb-6">Configuration vedettes</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="build in builds" :key="build.id" class="card rounded-3xlbg-base-200 shadow-md">
        <figure>
          <img
            :src="`/img/builds/${build.id}.jpg`"
            alt="Build Image"
            class="h-100 object-cover aspect-square w-full"
          />
        </figure>
        <div class="card-body">
          <h3 class="card-title text-lg font-bold">{{ build.name }}</h3>
          <p class="text-sm text-secondary font-bold">{{ build.price }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>
