<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const userId = localStorage.getItem('userId') || '' // récupère le user ID courant
const qrCodeUrl = ref<string | null>(null)

const generateQRCode = async () => {
  try {
    const res = await axios.post('/api/2fa/setup', { userId })
    qrCodeUrl.value = res.data.qrCodeDataUrl
  } catch (error) {
    console.error('Erreur QR Code 2FA', error)
  }
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Configurer l'authentification à deux facteurs</h1>
    <button @click="generateQRCode" class="bg-green-500 text-white px-4 py-2 rounded">
      Générer un QR Code
    </button>

    <div v-if="qrCodeUrl" class="mt-6">
      <p class="mb-2">Scanne ce QR code avec Google Authenticator :</p>
      <img :src="qrCodeUrl" alt="QR Code 2FA" />
    </div>
  </div>
</template>
