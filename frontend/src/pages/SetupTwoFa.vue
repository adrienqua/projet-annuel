<script setup lang="ts">
import { ref } from 'vue'
import { setup2FA, verify2FA } from '@/services/TwoFAAPI'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userId = localStorage.getItem('userId') || ''
const qrCodeUrl = ref<string | null>(null)
const code = ref('')
const message = ref('')
const router = useRouter()

const handleSetup = async () => {
  try {
    const res = await setup2FA(userId)
    qrCodeUrl.value = res.qrCodeDataUrl
    message.value = ''
  } catch (err) {
    message.value = 'Erreur lors de la génération du QR code'
    console.error(err)
  }
}

const handleVerify = async () => {
  try {
    await verify2FA(userId, code.value)
    message.value = '2FA activé avec succès'
    setTimeout(() => router.push('/'), 1500)
  } catch (e) {
    message.value = 'Code incorrect'
    console.error(e)
  }
}

const handleReset = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/twofa/reset`, { userId })
    message.value = '2FA réinitialisé avec succès'
    qrCodeUrl.value = null
    code.value = ''
  } catch (err) {
    console.error('Erreur reset 2FA', err)
    message.value = '❌ Échec de la réinitialisation'
  }
}

</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Configurer 2FA</h1>

    <button @click="handleSetup" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
      Générer le QR Code
    </button>

    <div v-if="qrCodeUrl">
      <p>Scanne ce QR code avec Google Authenticator :</p>
      <img :src="qrCodeUrl" alt="QR Code" class="my-4 w-48" />

      <input
        v-model="code"
        type="text"
        placeholder="Code à 6 chiffres"
        class="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <button @click="handleVerify" class="bg-blue-500 text-white px-4 py-2 rounded">
        Vérifier
      </button>
    </div>

    <p class="mt-4 text-red-600">{{ message }}</p>
  </div>

  <button
    @click="handleReset"
    class="bg-red-500 text-white px-4 py-2 rounded mt-2"
  >
    Réinitialiser le 2FA
  </button>

</template>
