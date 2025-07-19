<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/ui/Navbar.vue'
import Footer from './components/ui/Footer.vue'
</script>

<template>
  <div class="bg-background min-h-screen flex flex-col font-poppins">
    <Navbar />
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
