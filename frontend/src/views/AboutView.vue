<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'À propos - Configurateur PC en ligne | Projet ESGI',
  meta: [
    {
      name: 'description',
      content:
        "Apprenez-en plus sur notre configurateur de PC en ligne développé par quatre étudiants de l'ESGI. Créez facilement une configuration personnalisée selon vos besoins et votre budget grâce à une interface moderne et intelligente.",
    },
    { property: 'og:title', content: 'À propos - Configurateur PC en ligne | Projet ESGI' },
    {
      property: 'og:description',
      content:
        "Apprenez-en plus sur notre configurateur de PC en ligne développé par quatre étudiants de l'ESGI. Créez facilement une configuration personnalisée selon vos besoins et votre budget grâce à une interface moderne et intelligente.",
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
  ],
})
</script>

<template>
  <main class="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-md">
    <article aria-labelledby="about-title" class="mb-10">
      <h1 id="about-title" class="text-3xl font-bold mb-4 text-primary">
        À propos de notre configurateur PC
      </h1>
      <p class="text-lg leading-relaxed mb-2">
        Ce site est un configurateur de
        <span class="font-semibold text-secondary">PC sur mesure</span>, développé dans le cadre
        d’un <span class="font-semibold text-accent">projet académique</span> par quatre étudiants
        en 1<sup>ère</sup> année de Mastère Ingénierie du Web à l’<span
          class="font-semibold text-primary"
          >ESGI</span
        >. Pour en savoir plus sur l'école, visitez le
        <a
          href="https://www.esgi.fr"
          target="_blank"
          rel="noopener"
          class="link link-primary underline"
          >site officiel de l'ESGI</a
        >.
      </p>
    </article>

    <section aria-labelledby="mission-title" class="mb-4">
      <details class="group">
        <summary
          class="cursor-pointer text-2xl font-semibold mb-3 text-secondary text-center rounded-full py-2 px-4 inline-block w-full bg-primary shadow-md transition-colors group-open:bg-primary/80"
        >
          Notre mission
        </summary>
        <div class="p-4">
          <p class="text-base leading-relaxed">
            Proposer une plateforme intuitive, rapide et intelligente pour permettre à tous – du
            passionné au néophyte – de créer facilement une configuration PC idéale,
            <span class="font-semibold text-accent"
              >adaptée à ses usages (gaming, bureautique, montage, etc.)</span
            >
            et à son budget.
          </p>
        </div>
      </details>
    </section>

    <section aria-labelledby="features-title" class="mb-4">
      <details class="group">
        <summary
          class="cursor-pointer text-2xl font-semibold mb-3 text-secondary text-center rounded-full py-2 px-4 inline-block w-full bg-primary shadow-md transition-colors group-open:bg-primary/80"
        >
          Fonctionnalités principales
        </summary>
        <div class="p-4">
          <ul class="list-disc ml-6 space-y-2 text-base">
            <li>
              <span class="font-semibold text-primary">Choix guidé</span> des composants compatibles
              (processeur, carte graphique, RAM, stockage...)
            </li>
            <li>
              <span class="font-semibold text-primary">Calcul automatique</span> du prix total en
              temps réel
            </li>
            <li>
              <span class="font-semibold text-primary">Conseils intelligents</span> selon les
              besoins spécifiques
            </li>
            <li>
              <span class="font-semibold text-primary">Interface responsive</span> et accessible sur
              tous les appareils
            </li>
          </ul>
        </div>
      </details>
    </section>

    <section aria-labelledby="project-info-title" class="mb-4">
      <details class="group">
        <summary
          class="cursor-pointer text-2xl font-semibold mb-3 text-secondary text-center rounded-full py-2 px-4 inline-block w-full bg-primary shadow-md transition-colors group-open:bg-primary/80"
        >
          À propos du projet
        </summary>
        <div class="p-4">
          <p class="mb-2">
            Ce configurateur a été réalisé dans le cadre du cursus de Mastère 1 à l’<span
              class="font-semibold text-primary"
              >ESGI</span
            >
            (École Supérieure de Génie Informatique). <br />
            L’équipe est composée de :
          </p>
          <ul class="list-disc ml-6 space-y-1">
            <li>Adrien QUACCHA</li>
            <li>Simon DENIS</li>
            <li>Francis CHAN</li>
            <li>Grégoire WARTNER</li>
          </ul>
        </div>
      </details>
    </section>

    <section>
      <details class="group">
        <summary
          class="cursor-pointer text-2xl font-semibold mb-3 text-secondary text-center rounded-full py-2 px-4 inline-block w-full bg-primary shadow-md transition-colors group-open:bg-primary/80"
        >
          Technologies utilisées
        </summary>
        <div class="p-4">
          <div class="flex space-x-8 overflow-x-auto py-4 justify-center">
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener"
              class="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-110 hover:bg-primary/10 rounded-xl p-2"
            >
              <img
                src="/logos/vue.svg"
                alt="Vue 3"
                class="h-12 mb-2 cursor-pointer transition-transform duration-300"
              />
              <span
                class="text-base font-semibold text-primary group-hover:text-primary-dark transition-colors"
                >Vue 3</span
              >
            </a>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener"
              class="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-110 hover:bg-blue-100 rounded-xl p-2"
            >
              <img
                src="/logos/typescript.svg"
                alt="TypeScript"
                class="h-12 mb-2 cursor-pointer transition-transform duration-300"
              />
              <span
                class="text-base font-semibold text-blue-700 group-hover:text-blue-900 transition-colors"
                >TypeScript</span
              >
            </a>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener"
              class="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-110 hover:bg-yellow-100 rounded-xl p-2"
            >
              <img
                src="/logos/vite.svg"
                alt="Vite"
                class="h-12 mb-2 cursor-pointer transition-transform duration-300"
              />
              <span
                class="text-base font-semibold text-yellow-600 group-hover:text-yellow-800 transition-colors"
                >Vite</span
              >
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener"
              class="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-110 hover:bg-cyan-100 rounded-xl p-2"
            >
              <img
                src="/logos/tailwindcss.svg"
                alt="Tailwind CSS"
                class="h-12 mb-2 cursor-pointer transition-transform duration-300"
              />
              <span
                class="text-base font-semibold text-cyan-600 group-hover:text-cyan-800 transition-colors"
                >Tailwind CSS</span
              >
            </a>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener"
              class="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-110 hover:bg-green-100 rounded-xl p-2"
            >
              <img
                src="/logos/nodejs.svg"
                alt="Node.js"
                class="h-12 mb-2 cursor-pointer transition-transform duration-300"
              />
              <span
                class="text-base font-semibold text-green-700 group-hover:text-green-900 transition-colors"
                >Node.js</span
              >
            </a>
          </div>
        </div>
      </details>
    </section>
  </main>

  <footer class="bg-base-200 text-base-content py-10 mt-10 shadow-inner">
    <div class="container mx-auto px-4">
      <h2 class="text-xl font-semibold text-center mb-6 py-2 px-4 inline-block w-full">
        Suivez-nous sur les réseaux sociaux
      </h2>
      <div class="flex justify-center gap-4 flex-wrap">
        <a
          href="https://twitter.com/esgi"
          target="_blank"
          rel="noopener"
          class="btn btn-circle btn-outline btn-secondary"
          aria-label="Twitter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M22.46 6c-.77.35-1.6.58-2.46.69a4.29 4.29 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.71 1.03A4.27 4.27 0 0 0 16 4a4.28 4.28 0 0 0-4.19 5.24A12.11 12.11 0 0 1 3 5.17a4.27 4.27 0 0 0 1.32 5.7 4.25 4.25 0 0 1-1.94-.54v.05a4.27 4.27 0 0 0 3.42 4.18 4.24 4.24 0 0 1-1.94.07 4.27 4.27 0 0 0 3.98 2.97A8.57 8.57 0 0 1 2 19.54a12.07 12.07 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.72 8.72 0 0 0 24 5.53a8.47 8.47 0 0 1-2.54.7z"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/esginformatique"
          target="_blank"
          rel="noopener"
          class="btn btn-circle btn-outline btn-secondary"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/school/esgi/"
          target="_blank"
          rel="noopener"
          class="btn btn-circle btn-outline btn-secondary"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M20.45 2H3.55A1.56 1.56 0 0 0 2 3.56v16.89A1.56 1.56 0 0 0 3.55 22h16.89A1.56 1.56 0 0 0 22 20.45V3.56A1.56 1.56 0 0 0 20.45 2zM8.5 19H5.5v-9h3v9zM7 8.5A1.5 1.5 0 1 1 7 5a1.5 1.5 0 0 1 0 3.5zM19 19h-3v-4.5c0-2.5-3-2.3-3 0V19h-3v-9h3v1.3c1.4-2.6 6-2.8 6 2.5V19z"
            />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/@ESGI_Informatique"
          target="_blank"
          rel="noopener"
          class="btn btn-circle btn-outline btn-secondary"
          aria-label="YouTube"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M21.8 8s-.2-1.4-.8-2a2.7 2.7 0 0 0-1.9-.8C16.6 5 12 5 12 5s-4.6 0-7.1.2A2.7 2.7 0 0 0 3 6a5.4 5.4 0 0 0-.8 2C2 10.6 2 12 2 12s0 1.4.2 2a5.4 5.4 0 0 0 .8 2 2.7 2.7 0 0 0 1.9.8c2.5.2 7.1.2 7.1.2s4.6 0 7.1-.2a2.7 2.7 0 0 0 1.9-.8 5.4 5.4 0 0 0 .8-2c.2-1.4.2-2.8.2-2.8s0-1.4-.2-2zM10 15V9l5 3-5 3z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/adrienqua/projet-annuel"
          target="_blank"
          rel="noopener"
          class="btn btn-circle btn-outline btn-secondary"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M12 2C6.5 2 2 6.6 2 12.1c0 4.4 2.9 8.2 6.9 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.3-1.1-1.3-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .9.1-.7.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.8-.1-.2-.4-1.2.1-2.5 0 0 .8-.2 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.8 1 1.7 1 2.8 0 3.8-2.3 4.7-4.5 4.9.3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.5C22 6.6 17.5 2 12 2z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>
