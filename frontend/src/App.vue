<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/ui/Navbar.vue'
import Footer from './components/ui/Footer.vue'
</script>

<template>
  <div class="bg-background min-h-screen font-poppins">
    <Navbar />
    <div class="mx-auto container max-w-6xl px-4 pt-12">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
