<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const props = defineProps<{
  title: string
}>()

const modal = ref<HTMLDialogElement | null>(null)

function open() {
  modal.value?.showModal()
}

function close() {
  modal.value?.close()
}

defineExpose({ open, close })
</script>

<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box bg-white rounded-3xl relative max-w-xl">
      <h3 class="font-montserrat font-extrabold text-xl mb-4">{{ title }}</h3>
      <slot />
      <form method="dialog">
        <button class="btn btn-md btn-circle btn-ghost absolute right-4 top-4">✕</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
