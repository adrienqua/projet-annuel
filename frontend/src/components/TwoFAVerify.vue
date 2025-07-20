<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const emit = defineEmits(['verified'])
const token = ref('')
const userId = localStorage.getItem('userId') || ''
const router = useRouter()
const message = ref('')

const verifyCode = async () => {
  try {
    const res = await axios.post('/api/2fa/verify', { userId, token: token.value })
    if (res.data.verified) {
      message.value = 'Code vérifié ! Authentification activée.'
      router.push('/')
    } else {
      message.value = 'Code incorrect'
    }
  } catch (e) {
    message.value = 'Erreur lors de la vérification.'
    console.error(e)
  }
}
emit('verified')
</script>

<template>
  <div class="p-8">
    <h1 class="text-xl font-bold mb-4">Vérification 2FA</h1>
    <input v-model="token" placeholder="Code à 6 chiffres" class="border px-3 py-2 rounded" />
    <button @click="verifyCode" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
      Vérifier
    </button>
    <p class="mt-4 text-red-500">{{ message }}</p>
  </div>
</template>
