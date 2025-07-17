<script setup lang="ts">
import { login } from '@/services/AuthAPI'
import { useAuth } from '@/stores/auth'
import { onMounted, ref } from 'vue'
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

let chainToRegister = false
const handleRegister = (element: HTMLElement) => {
  const loginBoard = document.getElementById('login-board')
  loginBoard && loginBoard.classList.add('page-exit')

  chainToRegister = true
  setTimeout(() => {
    router.push('/register')
  }, 380)
}
</script>

<style scoped>
#login-board {
  transition: all 0.4s;
}

.page-entry {
  animation: rotateAndFade 0.4s ease-in-out forwards;
  transform: rotateY(0deg);
}

@keyframes rotateAndFade {
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  50% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
}

.page-exit {
  animation: rotateAndFadeExit 0.4s ease-in-out forwards;
  transform: rotateY(0deg);
}

@keyframes rotateAndFadeExit {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateY(90deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(90deg);
    opacity: 0;
  }
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div id="login-board" class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md page-entry">
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
        <a @click="handleRegister" class="inline-block w-full text-end">S'inscrire</a>
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>
