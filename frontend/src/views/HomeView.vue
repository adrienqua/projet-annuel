<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBuild } from '@/services/BuildAPI'

const builds = ref([])

onMounted(async () => {
  const res1 = await getBuild(1)
  const res2 = await getBuild(2)
  const res3 = await getBuild(3)
  builds.value.push(res1, res2, res3)

  let index = 0
  const carousel = document.getElementById('carousel')
  const total = carousel.children.length

  setInterval(() => {
    index = (index + 1) % total
    carousel.style.transform = `translateX(-${index * 100}%)`
  }, 3000) // Change every 4 seconds
})
</script>

<template>
  <main>
    <div class="carousel w-full shadow-md rounded-lg">
      <div id="item1" class="carousel-item relative w-full">
        <img src="/img/displays/1.jpeg" alt="Image 1" class="w-full rounded-lg" />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a href="#item3" class="btn btn-circle btn-secondary">❮</a>
          <a href="#item2" class="btn btn-circle btn-secondary">❯</a>
        </div>
      </div>
      <div id="item2" class="carousel-item relative w-full">
        <img src="/img/displays/2.jpg" alt="Image 2" class="w-full rounded-lg" />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a href="#item1" class="btn btn-circle btn-secondary">❮</a>
          <a href="#item3" class="btn btn-circle btn-secondary">❯</a>
        </div>
      </div>
      <div id="item3" class="carousel-item relative w-full">
        <img src="/img/displays/3.png" alt="Image 3" class="w-full rounded-lg" />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
        >
          <a href="#item2" class="btn btn-circle btn-secondary">❮</a>
          <a href="#item1" class="btn btn-circle btn-secondary">❯</a>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center gap-2 py-2">
      <a href="#item1" class="btn btn-xs btn-circle btn-outline btn-primary">1</a>
      <a href="#item2" class="btn btn-xs btn-circle btn-outline btn-primary">2</a>
      <a href="#item3" class="btn btn-xs btn-circle btn-outline btn-primary">3</a>
    </div>
    <div class="text-center mt-8">
      <h1
        class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 drop-shadow-md leading-relaxed pb-2"
      >
        Bienvenue sur le configurateur de PC nouvelle génération
      </h1>

      <div class="relative w-full max-w-full mx-auto overflow-hidden mt-2 pb-2">
        <div id="carousel" class="flex transition-transform duration-700 ease-in-out">
          <p class="min-w-full text-xl font-medium text-center">
            Configurez votre PC sur mesure en quelques clics.
          </p>
          <p class="min-w-full text-xl font-medium text-center">
            Choisissez parmi une large sélection de composants pour créer la machine de vos rêves.
          </p>
          <p class="min-w-full text-xl font-medium text-center">Votre PC, vos règles.</p>
        </div>
      </div>
    </div>
    <div class="mt-12 px-4">
      <h2 class="text-3xl font-bold text-center mb-6">Configuration vedettes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="build in builds" :key="build.id" class="card bg-base-200 shadow-md">
          <figure>
            <img :src="`/img/builds/${build.id}.jpg`" alt="Build Image" class="h-100 object-cover w-full" />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg font-bold">{{ build.name }}</h3>
            <p class="text-sm text-gray-600">{{ build.price }} €</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <a href="/builder" class="btn btn-primary btn-lg rounded-full"
        >Commencer à configurer mon PC</a
      >
    </div>

    <!-- Section blog - remplacer les lorem ipsum -->
    <div class="mt-12 px-4">
      <h2 class="text-3xl font-bold text-center mb-6">Blog</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card bg-base-200 shadow-md">
          <figure>
            <img
              src="/img/articles/dlss.jpg"
              alt="Blog Image"
              class="h-48 object-cover w-full"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg font-bold">Frame generation : arnaque ou miracle ?</h3>
            <p class="text-sm text-gray-600">
              DLSS, FSR, ExtraSS... Tellement d'options de génération d'images dans l'industrie
              qu'on ne sait pas ou regarder !
            </p>
            <div class="card-actions justify-end">
              <a href="#" class="btn btn-primary btn-sm">Lire la suite</a>
            </div>
          </div>
        </div>
        <div class="card bg-base-200 shadow-md">
          <figure>
            <img
              src="/img/articles/intel.png"
              alt="Blog Image"
              class="h-48 object-cover w-full"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg font-bold">L'autodestruction des processeurs Intel</h3>
            <p class="text-sm text-gray-600">
              Des études récentes montrent que les processeurs Intel perdent en performance au long
              de leur utilisation.
            </p>
            <div class="card-actions justify-end">
              <a href="#" class="btn btn-primary btn-sm">Lire la suite</a>
            </div>
          </div>
        </div>
        <div class="card bg-base-200 shadow-md">
          <figure>
            <img
              src="/img/articles/rate.jpg"
              alt="Blog Image"
              class="h-48 object-cover w-full"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg font-bold">Framerate vs refresh rate : le duel</h3>
            <p class="text-sm text-gray-600">
              Deux termes bien différents pourtant inséparables, apprenez à les distinguer en lisant
              cet article !
            </p>
            <div class="card-actions justify-end">
              <a href="#" class="btn btn-primary btn-sm">Lire la suite</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section FAQ -->
    <div class="mt-12 px-4">
      <h2 class="text-3xl font-bold text-center mb-6">FAQ</h2>
      <div class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium">Comment configurer mon PC ?</div>
        <div class="collapse-content">
          <p>
            Pour configurer votre PC, cliquez sur le bouton "Commencer à configurer mon PC" et
            suivez les instructions.
          </p>
        </div>
      </div>
      <div class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-4">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium">Quels sont les délais de livraison ?</div>
        <div class="collapse-content">
          <p>
            Les délais de livraison varient en fonction des composants sélectionnés. En général, la
            livraison prend entre 5 et 10 jours ouvrables.
          </p>
        </div>
      </div>
      <div class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-4">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium">Puis-je retourner ma commande ?</div>
        <div class="collapse-content">
          <p>
            Oui, vous pouvez retourner votre commande dans un délai de 14 jours après réception.
            Veuillez consulter notre politique de retour pour plus de détails.
          </p>
        </div>
      </div>
      <div class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-4">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium">Comment contacter le support ?</div>
        <div class="collapse-content">
          <p>
            Vous pouvez nous contacter via notre formulaire de contact situé dans la section
            "Contact" du site. Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>
    </div>

    <!-- Section avis clients -->
    <div class="mt-12 px-4 pb-12">
      <h2 class="text-3xl font-bold text-center mb-6">Avis clients</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card bg-base-200 shadow-md">
          <div class="card-body">
            <h3 class="text-xl font-bold text-yellow-400 text-center">★ ★ ★ ★ ★</h3>
            <p class="text-sm text-gray-600">
              "J'ai commandé un PC sur mesure et je suis ravi du résultat ! La qualité est au
              rendez-vous."
            </p>
            <div class="card-actions justify-end">
              <span class="font-bold">Jean Dupont</span>
            </div>
          </div>
        </div>
        <div class="card bg-base-200 shadow-md">
          <div class="card-body">
            <h3 class="text-xl font-bold text-yellow-400 text-center">★ ★ ★ ★ ★</h3>
            <p class="text-sm text-gray-600">
              "Service client au top, très réactif et à l'écoute. Je recommande vivement !"
            </p>
            <div class="card-actions justify-end">
              <span class="font-bold">Marie Curie</span>
            </div>
          </div>
        </div>
        <div class="card bg-base-200 shadow-md">
          <div class="card-body">
            <h3 class="text-xl font-bold text-yellow-400 text-center">★ ★ ★ ★ ★</h3>
            <p class="text-sm text-gray-600">
              "Configuration facile à réaliser, j'ai pu créer le PC de mes rêves en quelques clics."
            </p>
            <div class="card-actions justify-end">
              <span class="font-bold">Albert Einstein</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
