<script setup lang="ts">
import { ref, onMounted } from 'vue'

const carouselRef = ref<HTMLElement | null>(null)

onMounted(() => {
  let index = 0
  const carousel = carouselRef.value
  if (!carousel) return

  const total = carousel.children.length

  setInterval(() => {
    index = (index + 1) % total
    carousel.style.transform = `translateX(-${index * 100}%)`
  }, 3000)
})
</script>

<template>
  <div class="text-center mt-8 mx-auto bg-white p-8 rounded-3xl shadow-md max-w-2xl">
    <h1
      class="text-2xl sm:text-3xl font-black tracking-tight leading-snug drop-shadow-sm flex flex-col"
    >
      <span class="block mb-1 text-black">Bienvenue sur le configurateur de PC</span>
      <span
        class="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
      >
        nouvelle génération
      </span>
    </h1>

    <div class="relative w-full max-w-full mx-auto overflow-hidden mt-6 pb-2">
      <div ref="carouselRef" class="flex transition-transform duration-700 ease-in-out">
        <p class="min-w-full text-base text-gray-700">
          Configurez votre PC sur mesure en quelques clics.
        </p>
        <p class="min-w-full text-base text-gray-700">
          Choisissez parmi une large sélection de composants pour créer la machine de vos rêves.
        </p>
        <p class="min-w-full text-base text-gray-700">Votre PC, vos règles.</p>
      </div>
    </div>

    <div class="flex justify-center mt-8">
      <router-link
        to="/builder"
        class="btn btn-secondary text-secondary-900 btn-md rounded-3xl hover:scale-105 duration-300 transition-all"
      >
        Commencer à configurer mon PC
      </router-link>
    </div>
  </div>
</template>
