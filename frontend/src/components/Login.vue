<script setup lang="ts">
import { login } from '@/services/AuthAPI'
import { useAuth } from '@/stores/auth'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user } = useAuth() as any

const email = ref<string>('')
const password = ref<string>('')

interface LoginResponse {
  data: {
    token: string
  }
}

onMounted(() => {
  if (user.email) {
    router.push('/')
  }
})
const handleLogin = async () => {
  try {
    const res = (await login(email.value, password.value)) as LoginResponse
    localStorage.setItem('token', res.data.token)
    window.location.href = '/'
  } catch {
    alert('Invalid credentials')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
