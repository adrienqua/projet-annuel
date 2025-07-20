<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Commande annulée | BuildMyPC',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})
</script>
<template>
  <div class="text-center container max-w-3xl mx-auto px-4 pt-12">
    <div class="bg-red-200 text-red-800 shadow-sm rounded-xl p-5 mb-5">
      Echec de la commande, veuillez vérifier si vos informations de paiement sont correctes.
    </div>
    <RouterLink to="/cart" class="btn rounded-3xl">Retour au panier</RouterLink>
  </div>
</template>
