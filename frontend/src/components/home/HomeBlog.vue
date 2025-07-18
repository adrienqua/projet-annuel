<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const blogPosts = ref([
  {
    id: 1,
    title: 'Frame generation : arnaque ou miracle ?',
    summary:
      "DLSS, FSR, ExtraSS... Tellement d'options de génération d'images dans l'industrie qu'on ne sait pas où regarder !",
    image: '/img/articles/dlss.jpg',
    route: '/',
  },
  {
    id: 2,
    title: "L'autodestruction des processeurs Intel",
    summary:
      'Des études récentes montrent que les processeurs Intel perdent en performance au long de leur utilisation.',
    image: '/img/articles/intel.png',
    route: '/',
  },
  {
    id: 3,
    title: 'Framerate vs refresh rate : le duel',
    summary:
      'Deux termes bien différents pourtant inséparables, apprenez à les distinguer en lisant cet article !',
    image: '/img/articles/rate.jpg',
    route: '/',
  },
])
</script>

<template>
  <div class="mt-16 px-4">
    <h2 class="font-montserrat text-2xl font-black text-center mb-6">Blog</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="post in blogPosts" :key="post.id" class="card bg-base-200 shadow-md rounded-3xl">
        <figure>
          <img :src="post.image" :alt="post.title" class="h-48 object-cover w-full" />
        </figure>
        <div class="card-body">
          <h3 class="card-title text-lg font-bold">{{ post.title }}</h3>
          <p class="text-sm text-gray-600">{{ post.summary }}</p>
          <div class="card-actions justify-end">
            <RouterLink :to="post.route" class="btn btn-primary btn-sm"> Lire la suite </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
