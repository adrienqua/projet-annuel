<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API = import.meta.env.VITE_API_URL
const router = useRouter()
const userId = ref('')
const qrCodeUrl = ref<string | null>(null)
const errorMsg = ref('')
onMounted(() => {
  const id = localStorage.getItem('userId')
  if (!id) {
    errorMsg.value = 'Utilisateur non connecté.'
    return
  }
  userId.value = id
  console.log('[2FA Setup] userId from localStorage:', userId.value)
})
const generateQRCode = async () => {
  if (!userId.value) {
    errorMsg.value = 'Utilisateur introuvable – reconnecte-toi.'
    return
  }

  try {
    const { data } = await axios.get(`${API}/twofa/setup`, {
      params: { userId: userId.value },
    })

    qrCodeUrl.value = data.qrCodeDataUrl
    errorMsg.value = ''
  } catch (err) {
    console.error('Erreur QR Code 2FA', err)
    errorMsg.value = 'Impossible de générer le QR code.'
  }
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Configurer l’authentification à deux facteurs</h1>

    <button
      @click="generateQRCode"
      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Générer le QR Code
    </button>

    <div v-if="qrCodeUrl" class="mt-6 text-center">
      <p class="mb-2">Scanne ce QR-code avec Google Authenticator :</p>
      <img :src="qrCodeUrl" alt="QR Code 2FA" class="inline-block w-48 h-48" />
      <p class="text-sm text-gray-500 mt-2">
        Puis saisis le code dans l’écran de vérification.
      </p>
    </div>

    <p v-if="errorMsg" class="mt-4 text-red-600">{{ errorMsg }}</p>
  </div>
</template>
