<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import { ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref, watchEffect } from 'vue'

const { user } = useAuth()
const { cartProducts } = useCartStore()
const isOpen = ref(false)
const token = ref<string | null>(null)

onMounted(() => {
  token.value = localStorage.getItem('token')
})

const isAuthenticated = computed(() => !!token.value)

const logout = () => {
  localStorage.removeItem('token')
  token.value = null
  window.location.href = '/login'
}

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
      <router-link to="/" class="text-xl font-semibold text-secondary-400 flex gap-2 items-center">
        <img src="/logo.png" alt="Logo" class="w-8 h-8" />
        <span>BuildMyPC</span>
      </router-link>

      <!-- Desktop  -->
      <ul class="hidden md:flex space-x-6 text-sm">
        <li>
          <router-link
            to="/products"
            class="hover:text-secondary-400 transition duration-300 font-medium"
            >Produits</router-link
          >
        </li>
        <li>
          <router-link
            to="/builder"
            class="hover:text-secondary-400 transition duration-300 font-medium"
            >Configurateur</router-link
          >
        </li>
        <li>
          <router-link
            to="/compare"
            class="hover:text-secondary-400 transition duration-300 font-medium"
            >Comparateur</router-link
          >
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-secondary-400 transition duration-300 font-medium"
            >À propos</router-link
          >
        </li>
        <li v-if="user.role === 'ADMIN'">
          <router-link
            to="/admin"
            class="hover:text-secondary-400 transition duration-300 font-medium"
          >
            Admin
          </router-link>
        </li>
      </ul>

      <div class="hidden md:flex text-sm">
        <router-link
          to="/cart"
          class="hover:text-secondary-400 transition duration-300 font-medium flex gap-1 items-center"
          ><ShoppingCartIcon class="w-5 h-5" />
          <span class="text-gray-300 text-xs">({{ cartProducts?.length }})</span></router-link
        >
        <router-link
          to="/login"
          v-if="!user.email"
          class="bg-secondary-400 hover:bg-secondary-400/90 text-secondary-900 font-medium px-4 py-2 rounded-lg transition hidden md:block ml-4"
        >
          Se connecter
        </router-link>
        <router-link to="/account" v-else class="px-6 py-3 text-sm flex gap-1 items-center">
          <UserIcon class="w-5 h-5" />
          <span class="text-gray-300">{{ user.name }}</span>

          <button @click="logout" class="text-gray-300 cursor-pointer">
            <ArrowLeftStartOnRectangleIcon class="w-5 h-5 ml-2" />
          </button>
        </router-link>
      </div>

      <button
        class="md:hidden text-white focus:outline-none cursor-pointer"
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

    <!-- Mobile  -->
    <div v-if="isOpen" class="md:hidden border-t border-gray-700 py-3">
      <div class="flex items-between justify-between">
        <div class="w-3/4">
          <router-link
            to="/login"
            v-if="!user.email"
            class="block ml-4 bg-secondary-400 hover:bg-secondary-400/90 text-secondary-900 font-medium px-4 py-2 rounded-lg transition max-w-[150px]"
          >
            Se connecter
          </router-link>

          <router-link
            to="/account"
            v-else
            class="px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium flex gap-4 items-center"
          >
            <div class="flex gap-1">
              <UserIcon class="w-5 h-5" />
              <span class="text-gray-300">{{ user.name }}</span>
            </div>
            <button @click="logout" class="text-gray-300 cursor-pointer">
              <ArrowLeftStartOnRectangleIcon class="w-5 h-5" />
            </button>
          </router-link>
        </div>
        <div class="">
          <router-link
            to="/cart"
            class="px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium flex gap-1 items-center justify-end"
            ><ShoppingCartIcon class="w-5 h-5" />
            <span class="text-gray-300 text-xs">({{ cartProducts?.length }})</span></router-link
          >
        </div>
      </div>
      <router-link
        to="/products"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium"
        >Produits</router-link
      >
      <router-link
        to="/builder"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium"
        >Configurateur</router-link
      >
      <router-link
        to="/compare"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium"
        >Comparateur</router-link
      >
      <router-link
        to="/about"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium"
        >À propos</router-link
      >
      <router-link
        v-if="user.role === 'ADMIN'"
        to="/admin"
        class="block px-6 py-3 hover:bg-gray-800 hover:text-secondary-400 transition duration-300 font-medium"
      >
        Admin
      </router-link>
    </div>
  </nav>
</template>
