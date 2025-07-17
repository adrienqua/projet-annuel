<template>
  <footer class="bg-primary text-white mt-12 border-t border-base-300">
    <div class="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div>
        <h3 class="footer-title">PC Builder</h3>
        <p class="max-w-3/4">Le configurateur de PC nouvelle génération. <br /> Assembler votre machine n'a jamais été aussi simple.</p>
      </div>
      <div>
        <h3 class="footer-title">Navigation</h3>
        <ul class="space-y-2">
          <li><a href="/" class="link link-hover">Accueil</a></li>
          <li><a href="/builder" class="link link-hover">Configurateur</a></li>
          <li><a href="/blog" class="link link-hover">Blog</a></li>
          <li><a href="/contact" class="link link-hover">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer-title">Légal</h3>
        <ul class="space-y-2">
          <li><a href="/mentions-legales" class="link link-hover">Mentions légales</a></li>
          <li><a href="/cgv" class="link link-hover">Conditions générales</a></li>
          <li><a href="/confidentialite" class="link link-hover">Politique de confidentialité</a></li>
        </ul>
      </div>
    </div>
    <div class="text-center py-4 border-t border-base-300 text-sm">
      &copy; {{ new Date().getFullYear() }} PC Builder. Tous droits réservés.
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
