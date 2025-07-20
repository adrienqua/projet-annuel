<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const emit = defineEmits(['setup-success'])
const API = import.meta.env.VITE_API_URL
const router = useRouter()
const userId = ref('')
const qrCodeUrl = ref<string | null>(null)
const errorMsg = ref('')

const generateQRCode = async () => {
  try {
    const id = localStorage.getItem('userId')
    if (!id) {
      errorMsg.value = 'Utilisateur non connecté.'
      return
    }
    userId.value = id

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

onMounted(() => {
  generateQRCode()
})
</script>

<template>
  <div class="p-4 text-center">
    <h2 class="text-lg font-bold mb-2">Scanne ce QR Code</h2>
    <p class="text-sm text-gray-600 mb-4">
      Utilise Google Authenticator ou une autre app 2FA compatible
    </p>

    <div v-if="qrCodeUrl">
      <img :src="qrCodeUrl" alt="QR Code 2FA" class="inline-block w-48 h-48" />
      <button @click="emit('setup-success')" class="btn btn-primary mt-4 w-full">
        J'ai scanné le code
      </button>
    </div>

    <p v-if="errorMsg" class="text-red-600 mt-2 text-sm">{{ errorMsg }}</p>
  </div>
</template>
