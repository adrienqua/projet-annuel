<script setup lang="ts">
import { login } from '@/services/AuthAPI'
import { verifyLogin2FA } from '@/services/TwoFAAPI'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
      router.push('/')
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
      router.push('/')
    } else {
      alert('Code incorrect')
    }
  } catch (e) {
    alert('Erreur lors de la vérification du code')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form v-if="!requires2FA" @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-green-300 rounded-lg"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full px-4 py-2 border border-green-300 rounded-lg"
        />
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
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
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Vérifier le code
        </button>
      </form>
    </div>
  </div>
</template>
