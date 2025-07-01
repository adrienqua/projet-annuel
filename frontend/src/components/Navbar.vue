<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { onMounted, watchEffect } from 'vue'

const { user } = useAuth() as any

watchEffect(() => {
  console.log('user', user)
})
</script>
<template>
  <nav class="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
    <router-link to="/" class="text-xl font-semibold">Logo</router-link>
    <ul class="flex space-x-6 text-sm">
      <li><router-link to="/" class="hover:text-blue-300 transition">Home</router-link></li>
      <li>
        <router-link to="/builder" class="hover:text-blue-300 transition">Builder</router-link>
      </li>
      <li><router-link to="/" class="hover:text-blue-300 transition">Services</router-link></li>
      <li><router-link to="/" class="hover:text-blue-300 transition">Contact</router-link></li>
    </ul>
    <router-link
      to="/login"
      v-if="!user.email"
      class="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition hidden md:block"
    >
      Se connecter
    </router-link>
    <span v-if="user.email">{{ user.email }}</span>
  </nav>
</template>
