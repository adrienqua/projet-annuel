<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const slides = ref([
  {
    src: '/img/displays/1.jpeg',
    alt: 'Configurer mon PC idéal en quelques clics !',
    text: 'Configurer mon PC idéal en quelques clics !',
    route: '/builder',
  },
  {
    src: '/img/displays/2.jpg',
    alt: 'Découvrez nos produits',
    text: 'Découvrez nos produits',
    route: '/',
  },
  {
    src: '/img/displays/3.png',
    alt: 'Comparer des composants',
    text: 'Comparer des composants',
    route: '/compare',
  },
])

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

const goTo = (index: number) => {
  currentIndex.value = index
}

let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(next, 6500)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="relative w-full shadow-md overflow-hidden md:h-[650px] md:max-h-[650px] h-[300px] max-h-[300px]"
  >
    <div
      class="flex transition-transform duration-700 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <RouterLink
        v-for="(slide, index) in slides"
        :key="index"
        :to="slide.route"
        class="w-full flex-shrink-0 h-full relative group"
      >
        <img :src="slide.src" :alt="slide.alt" class="w-full h-full object-cover" />
        <div
          class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xl p-4 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {{ slide.text }}
        </div>
      </RouterLink>
    </div>

    <div
      class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-5 pointer-events-none"
    >
      <button @click="prev" class="btn btn-circle btn-secondary pointer-events-auto">❮</button>
      <button @click="next" class="btn btn-circle btn-secondary pointer-events-auto">❯</button>
    </div>
  </div>

  <div class="flex w-full justify-center gap-2 py-2">
    <button
      v-for="(_, index) in slides"
      :key="index"
      @click="goTo(index)"
      class="btn btn-xs btn-circle"
      :class="index === currentIndex ? 'btn-primary' : 'btn-outline'"
    >
      {{ index + 1 }}
    </button>
  </div>
</template>
