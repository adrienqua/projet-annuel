<script setup lang="ts">
import { ref } from 'vue'

const reviews = ref([
  {
    id: 1,
    name: 'Jean Dupont',
    stars: 5,
    content:
      "J'ai commandé un PC sur mesure et je suis ravi du résultat ! La qualité est au rendez-vous.",
  },
  {
    id: 2,
    name: 'Clémence Prudeaux',
    stars: 5,
    content: 'Service client au top, très réactif et à l’écoute. Je recommande vivement !',
  },
  {
    id: 3,
    name: 'Yvick Laroche',
    stars: 5,
    content: "Configuration facile à réaliser, j'ai pu créer le PC de mes rêves en quelques clics.",
  },
])
</script>

<template>
  <div class="mt-16 px-4">
    <h2 class="font-montserrat text-2xl font-black text-center mb-6">Avis clients</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="review in reviews" :key="review.id" class="card bg-white shadow-md rounded-3xl">
        <div class="card-body">
          <h3 class="text-xl font-bold text-yellow-400 text-center">
            {{ '★ '.repeat(review.stars).trim() }}
          </h3>
          <p class="text-sm text-gray-600">"{{ review.content }}"</p>
          <div class="card-actions justify-end">
            <span class="font-bold">{{ review.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
