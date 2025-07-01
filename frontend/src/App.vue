<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div class="mx-auto container max-w-6xl pt-12">
    <RouterView />
  </div>
</template>
