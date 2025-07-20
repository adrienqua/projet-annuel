<script setup lang="ts">
import { ref } from 'vue'
import TwoFASetup from '@/components/TwoFASetup.vue'
import TwoFAVerify from '@/components/TwoFAVerify.vue'

const modalRef = ref<HTMLDialogElement | null>(null)
const step = ref<'setup' | 'verify'>('setup')

defineExpose({
  open: () => {
    step.value = 'setup'
    modalRef.value?.showModal()
  },
  close: () => modalRef.value?.close(),
})

const handleSetupSuccess = () => {
  step.value = 'verify'
}

const handleClose = () => {
  modalRef.value?.close()
}
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box p-6">
      <h3 class="text-xl font-bold mb-4">Activer la double authentification</h3>

      <component
        :is="step === 'setup' ? TwoFASetup : TwoFAVerify"
        @setup-success="handleSetupSuccess"
        @close="handleClose"
      />

      <div class="modal-action">
        <button type="button" class="btn" @click="handleClose">Fermer</button>
      </div>
    </div>
  </dialog>
</template>
