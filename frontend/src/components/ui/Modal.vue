<script setup lang="ts">
import { ref, watch, computed, toRefs, useTemplateRef, toRef, type Ref } from 'vue'

const props = defineProps<{
  modalRef: Ref<HTMLDialogElement | null>
  test: string
}>()

/* const { modalRef } = toRefs(props)
 */
/* watch(modalRef, (newVal) => {
  if (newVal) {
    const dialog = newVal as HTMLDialogElement
    dialog.addEventListener('cancel', () => {
      dialog.close()
    })
  }
}) */
</script>

<template>
  <button class="btn" @click="modalRef?.value?.showModal()">open modal</button>
  <dialog ref="modalRef" id="my_modal_2" class="modal">
    <div class="modal-box bg-white">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
