<script setup lang="ts">
import { login } from '@/services/AuthAPI'
import { useAuth } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { verifyLogin2FA } from '@/services/TwoFAAPI'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Se connecter | BuildMyPC',
  meta: [
    {
      name: 'description',
      content:
        'Connectez-vous pour accéder à votre compte pour gérer vos informations personnelles, vos configurations de PC et suivre vos commandes.',
    },
    { property: 'og:title', content: 'Se connecter | BuildMyPC' },
    {
      property: 'og:description',
      content:
        'Connectez-vous pour accéder à votre compte pour gérer vos informations personnelles, vos configurations de PC et suivre vos commandes.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'BuildMyPC' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
})

const router = useRouter()

const email = ref('')
const password = ref('')
const twoFAToken = ref('')
const userId = ref('')
const requires2FA = ref(false)

const handleLogin = async () => {
  try {
    const res = await login(email.value, password.value)
    const { token, userId: id, isTwoFA } = res?.data

    if (isTwoFA) {
      userId.value = id
      requires2FA.value = true
      localStorage.setItem('temp_token', token)
    } else {
      localStorage.setItem('token', token)
      window.location.href = '/'
    }
  } catch (e) {
    alert('Email ou mot de passe invalide')
  }
}

const handle2FAVerification = async () => {
  try {
    const res = await verifyLogin2FA(userId.value, twoFAToken.value)

    if (res.token) {
      localStorage.setItem('token', res.token)
      localStorage.removeItem('temp_token')
      window.location.href = '/'
    } else {
      alert('Code incorrect')
    }
  } catch (e) {
    alert('Erreur lors de la vérification du code')
  }
}

let chainToRegister = false
const handleRegister = (event: MouseEvent) => {
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
      <h1 class="text-2xl font-bold text-center mb-6">Se connecter</h1>
      <form v-if="!requires2FA" @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-secondary-300 rounded-lg"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full px-4 py-2 border border-secondary-300 rounded-lg"
        />
        <button
          @click="handleRegister"
          type="button"
          class="inline-block w-full text-end text-gray-800 hover:text-secondary cursor-pointer transition-all duration-200"
        >
          S'inscrire
        </button>
        <button
          type="submit"
          class="w-full btn bg-secondary-500 text-white py-2 rounded-lg hover:bg-secondary-600"
        >
          Connexion
        </button>
      </form>
      <form v-else @submit.prevent="handle2FAVerification" class="space-y-4">
        <p class="text-sm mb-2 text-gray-700">Code 2FA requis</p>
        <input
          v-model="twoFAToken"
          type="text"
          placeholder="Code à 6 chiffres"
          class="w-full px-4 py-2 border border-blue-300 rounded-lg"
        />
        <button
          @click="handleRegister"
          type="button"
          class="inline-block w-full text-end text-gray-800 hover:text-secondary cursor-pointer transition-all duration-200"
        >
          S'inscrire
        </button>
        <button
          type="submit"
          class="w-full btn bg-secondary-500 text-white py-2 rounded-lg hover:bg-secondary-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>
