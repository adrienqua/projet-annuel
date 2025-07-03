<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/ui/Navbar.vue'
</script>

<template>
  <div class="bg-background min-h-screen">
    <Navbar />
    <div class="mx-auto container max-w-6xl pt-12">
      <RouterView />
    </div>
  </div>
</template>
