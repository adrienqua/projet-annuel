<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import type { User } from '../types/user'
import { onMounted, ref } from 'vue'
import { getUser } from '@/services/AuthAPI'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { setup2FA, verify2FA } from '@/services/TwoFAAPI'
import Modal from '../ui/Modal.vue'

const props = defineProps<{
  user: User | null
}>()
const emit = defineEmits<{
  (e: 'user-updated'): void
}>()
const userId = localStorage.getItem('userId') || ''
const qrCodeUrl = ref<string | null>(null)
const code = ref('')
const message = ref('')
const router = useRouter()

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)

const handleReset = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/twofa/reset`, { userId })
    message.value = '2FA réinitialisé avec succès'
    qrCodeUrl.value = null
    code.value = ''
    emit('user-updated')
    toast.success('Double authentification désactivée avec succès !')
  } catch (err) {
    console.error('Erreur reset 2FA', err)
    message.value = 'Échec de la réinitialisation'
  }
}

const handleVerify = async () => {
  try {
    await verify2FA(userId, code.value)
    message.value = '2FA activé avec succès'
    //setTimeout(() => router.push('/'), 1500)
    emit('user-updated')
    modalRef.value?.close()
    toast.success('Double authentification activée avec succès !')
  } catch (e) {
    
    message.value = 'Code incorrect'
    console.error(e)
  }
}

const handleSetup = async () => {
  try {
    const res = await setup2FA(userId)
    qrCodeUrl.value = res.qrCodeDataUrl
    message.value = ''
    modalRef.value?.open()
  } catch (err) {
    message.value = 'Erreur lors de la génération du QR code'
    console.error(err)
  }
}
</script>

<template>
  <div class="mt-6 flex max-w-full md:max-w-1/2 flex-col">
    <h2 class="text-xl font-montserrat font-black mb-4">Sécurité</h2>
    <div class="bg-white rounded-3xl p-6 shadow-md">
      <p v-if="user?.isTwoFA" class="text-gray-600 flex justify-between items-center">
        L'authentification à deux facteurs est activée.
        <button class="btn btn-gray-200" @click="handleReset">Désactiver</button>
      </p>
      <p v-else class="text-gray-600 flex justify-between items-center">
        L'authentification à deux facteurs n'est pas activée.
        <button class="btn btn-secondary" @click="handleSetup">Activer</button>
      </p>
    </div>
    <Modal ref="modalRef" title="Activer la double authentification" class="font-medium">
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

        <button @click="handleVerify" class="btn btn-primary w-full">Vérifier le code</button>
      </div>
    </Modal>
  </div>
</template>
