<template>
  <div class="border rounded p-4 bg-white shadow">
    <h2 class="text-xl font-bold mb-2">{{ component.name }}</h2>
    <p><strong>Type :</strong> {{ component.type?.name }}</p>
    <p><strong>Fabricant :</strong> {{ component.manufacturer?.name }}</p>
    <h3 class="mt-4 font-semibold">Spécifications :</h3>
    <pre class="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{{ JSON.stringify(component.specs, null, 2) }}
    </pre>
  </div>
</template>22

<script setup lang="ts">
defineProps<{ component: any }>()
</script>
