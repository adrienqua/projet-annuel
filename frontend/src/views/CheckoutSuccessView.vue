<script setup lang="ts">
import { checkoutSuccess } from '@/services/CheckoutAPI'
import { useCartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = ref<string>(route.query.orderId as string)
const sessionId = ref<string>(route.query.sessionId as string)

const { handleEmptyCart } = useCartStore()

const handleSuccess = async () => {
  const res = await checkoutSuccess({
    orderId: orderId.value,
    sessionId: sessionId.value,
  })

  if (res?.data?.orderStatus === 'PAID') {
    handleEmptyCart()
  }
}

onMounted(() => {
  if (sessionId.value) {
    handleSuccess()
  }
})
</script>
<template>
  <div class="text-center">
    <div
      class="bg-secondary-200 text-secondary-800 shadow-sm rounded-xl p-5 mb-5 max-w-3xl mx-auto"
    >
      Votre commande {{ orderId }} a bien été effectuée !
    </div>
    <RouterLink to="/account" class="btn rounded-3xl"> Voir les détails sur mon compte </RouterLink>
  </div>
</template>
