<script setup lang="ts">
const props = defineProps<{ headerList: string[] }>()
</script>
<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead>
        <tr>
          <th v-for="header in headerList" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
