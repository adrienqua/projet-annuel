<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { ref, watchEffect } from 'vue'

const { user } = useAuth() as any
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

watchEffect(() => {
  console.log('user', user)
})
</script>

<template>
  <nav class="bg-black text-white w-full z-50 border-b border-gray-800">
    <div class="container px-6 py-4 flex items-center justify-between mx-auto max-w-6xl">
      <router-link to="/" class="text-xl font-semibold text-secondary">Logo</router-link>

      <!-- Desktop menu -->
      <ul class="hidden md:flex space-x-6 text-sm">
        <li>
          <router-link
            to="/builder"
            class="hover:text-secondary transition duration-300 font-medium"
            >Configurateur</router-link
          >
        </li>
        <li>
          <router-link
            to="/builder"
            class="hover:text-secondary transition duration-300 font-medium"
            >Comparateur</router-link
          >
        </li>
        <li>
          <router-link to="/" class="hover:text-secondary transition duration-300 font-medium"
            >Services</router-link
          >
        </li>
        <li>
          <router-link to="/" class="hover:text-secondary transition duration-300 font-medium"
            >Contact</router-link
          >
        </li>
      </ul>

      <!-- Login Button (desktop only) -->
      <router-link
        to="/login"
        v-if="!user.email"
        class="bg-secondary hover:bg-secondary/90 text-white font-medium px-4 py-2 rounded-lg transition hidden md:block"
      >
        Se connecter
      </router-link>
      <router-link to="/profil" v-else class="px-6 py-3 text-sm text-gray-300"
        >Bonjour, {{ user.email }}</router-link
      >

      <!-- Mobile menu toggle button -->
      <button
        class="md:hidden text-white focus:outline-none"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden border-t border-gray-700">
      <router-link
        to="/builder"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary transition duration-300 font-medium"
        >Configurateur</router-link
      >
      <router-link
        to="/builder"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary transition duration-300 font-medium"
        >Comparateur</router-link
      >
      <router-link
        to="/"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary transition duration-300 font-medium"
        >Services</router-link
      >
      <router-link
        to="/"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary transition duration-300 font-medium"
        >Contact</router-link
      >
      <router-link
        to="/login"
        v-if="!user.email"
        class="block px-6 py-3 text-white bg-blue-700 hover:bg-blue-600"
      >
        Se connecter
      </router-link>
      <router-link to="/profil" v-else class="px-6 py-3 text-sm text-gray-300"
        >Bonjour, {{ user.email }}</router-link
      >
    </div>
  </nav>
</template>
