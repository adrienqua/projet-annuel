<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Admin  | BuildMyPC',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-base-100 p-10">
    <h1 class="text-3xl font-bold mb-8 text-center">Espace Administrateur</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <router-link
        to="/admin/users"
        class="btn btn-sm bg-gray-200 rounded-3xl shadow-md hover:scale-105 hover:shadow-lg transition text-center"
      >
        Utilisateurs
      </router-link>

      <router-link
        to="/admin/components"
        class="btn btn-sm bg-gray-200 rounded-3xl shadow-md hover:scale-105 hover:shadow-lg transition text-center"
      >
        Composants
      </router-link>

      <router-link
        to="/admin/orders"
        class="btn btn-sm bg-gray-200 rounded-3xl shadow-md hover:scale-105 hover:shadow-lg transition text-center"
      >
        Commandes
      </router-link>
    </div>

    <div class="mt-10 max-w-5xl mx-auto">
      <router-view />
    </div>
  </div>
</template>
