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
    message.value = 'Échec de la réinitialisation'
  }
}
</script>

<template>
  <main class="min-h-[80vh] flex items-center justify-center bg-base-100 px-4">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-lg border border-gray-200">
      <h1 class="text-3xl font-bold mb-6 text-center text-neutral">Activer la double authentification</h1>

      <button @click="handleSetup" class="btn btn-success w-full mb-4">
        Générer le QR Code
      </button>

      <div v-if="qrCodeUrl" class="text-center">
        <p class="text-sm text-gray-600 mb-4">Scanne le QR code avec Google Authenticator :</p>
        <img :src="qrCodeUrl" alt="QR Code" class="mx-auto mb-4 w-48 rounded border" />

        <input
          v-model="code"
          type="text"
          maxlength="6"
          placeholder="Code à 6 chiffres"
          class="input input-bordered w-full mb-4"
        />

        <button @click="handleVerify" class="btn btn-primary w-full">
          Vérifier le code
        </button>
      </div>

      <button @click="handleReset" class="btn btn-error w-full mt-6">
        Réinitialiser le 2FA
      </button>

      <p v-if="message" class="mt-4 text-center text-sm text-red-600">{{ message }}</p>
    </div>
  </main>
</template>
