<script setup lang="ts">
import Builder from '@/components/Builder.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Configurateur PC sur mesure | BuildMyPC',
  meta: [
    {
      name: 'description',
      content:
        'Assemblez votre PC sur mesure facilement avec BuildMyPC. Choisissez vos composants compatibles (CPU, GPU, RAM, etc.) et obtenez un récapitulatif instantané du prix. Idéal pour gamers, créateurs et professionnels.',
    },
    { property: 'og:title', content: 'BuildMyPC | Configurateur PC sur mesure en ligne' },
    {
      property: 'og:description',
      content:
        'Créez votre propre configuration PC avec notre configurateur simple et rapide. Sélectionnez vos composants, visualisez le prix total, et enregistrez ou ajoutez au panier en un clic.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'BuildMyPC' },
  ],
})
</script>

<template>
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <Builder />
  </main>
</template>
