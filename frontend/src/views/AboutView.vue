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
  <main>
    <article aria-labelledby="about-title">
      <h1 id="about-title">À propos de notre configurateur PC</h1>
      <p>
        Ce site est un configurateur de <strong>PC sur mesure</strong>, développé dans le cadre d’un
        <strong>projet académique</strong> par quatre étudiants en 1<sup>ère</sup> année de Mastère Ingénierie du Web à l’<strong>ESGI</strong>.
        Pour en savoir plus sur l'école, visitez le <a href="https://www.esgi.fr" target="_blank" rel="noopener">site officiel de l'ESGI</a>.
      </p>
    </article>

    <section aria-labelledby="mission-title">
      <h2 id="mission-title">Notre mission</h2>
      <p>
        Proposer une plateforme intuitive, rapide et intelligente pour permettre à tous – du passionné au néophyte – de créer facilement une
        configuration PC idéale, <strong>adaptée à ses usages (gaming, bureautique, montage, etc.)</strong> et à son budget.
      </p>
    </section>

    <section aria-labelledby="features-title">
      <h2 id="features-title">Fonctionnalités principales</h2>
      <ul>
        <li><strong>Choix guidé</strong> des composants compatibles (processeur, carte graphique, RAM, stockage...)</li>
        <li><strong>Calcul automatique</strong> du prix total en temps réel</li>
        <li><strong>Conseils intelligents</strong> selon les besoins spécifiques</li>
        <li><strong>Interface responsive</strong> et accessible sur tous les appareils</li>
      </ul>
    </section>

    <section aria-labelledby="project-info-title">
      <h2 id="project-info-title">À propos du projet</h2>
      <p>
        Ce configurateur a été réalisé dans le cadre du cursus de Mastère 1 à l’<strong>ESGI</strong> (École Supérieure de Génie Informatique). L’équipe est composée de :
      </p>
      <ul>
        <li>Adrien QUACCHA</li>
        <li>Simon DENIS</li>
        <li>Francis CHAN</li>
        <li>Grégoire WARTNER</li>
      </ul>
      <br/>
      <p>
        Technologies utilisées : <strong>Vue 3</strong>, <strong>TypeScript</strong>, <strong>Vite</strong>, <strong>Tailwind CSS</strong> et <strong>Node.js</strong>.
        Retrouvez notre projet sur <a href="https://github.com/adrienqua/projet-annuel" target="_blank" rel="noopener">GitHub</a>.
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #222;
  background: #fff;
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.6rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  margin-left: 1.5rem;
  list-style: disc;
  line-height: 1.5;
}

a {
  color: #1976d2;
  text-decoration: underline;
}
</style>
