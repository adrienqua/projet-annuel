<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'Comment configurer mon PC ?',
    answer:
      'Pour configurer votre PC, cliquez sur le bouton "Commencer à configurer mon PC" et suivez les instructions.',
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'Les délais de livraison varient en fonction des composants sélectionnés. En général, la livraison prend entre 5 et 10 jours ouvrables.',
  },
  {
    question: 'Puis-je retourner ma commande ?',
    answer:
      'Oui, vous pouvez retourner votre commande dans un délai de 14 jours après réception. Veuillez consulter notre politique de retour pour plus de détails.',
  },
  {
    question: 'Comment contacter le support ?',
    answer:
      'Vous pouvez nous contacter via notre formulaire de contact situé dans la section "Contact" du site. Nous vous répondrons dans les plus brefs délais.',
  },
])
</script>

<template>
  <div class="mt-16 px-4 pb-12">
    <h2 class="font-montserrat text-2xl font-black text-center mb-6">FAQ</h2>
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
      :class="{ 'mt-4': index !== 0 }"
    >
      <input type="checkbox" class="peer" />
      <div class="collapse-title text-lg font-medium">
        {{ faq.question }}
      </div>
      <div class="collapse-content text-gray-700">
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>
