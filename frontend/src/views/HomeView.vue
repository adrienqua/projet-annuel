<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBuild } from '@/services/BuildAPI'
import router from '@/router'
import HomeFAQ from '@/components/home/HomeFAQ.vue'
import HomeBlog from '@/components/home/HomeBlog.vue'
import HomeFeaturedBuilds from '@/components/home/HomeFeaturedBuilds.vue'
import HomeSlider from '@/components/home/HomeSlider.vue'
import type { Build } from '@/components/types/build'
import HomeAbout from '@/components/home/HomeAbout.vue'
import HomeReviews from '@/components/home/HomeReviews.vue'

const builds = ref<Build[]>([])

onMounted(async () => {
  const res1 = await getBuild(1)
  const res2 = await getBuild(2)
  const res3 = await getBuild(3)
  builds.value.push(res3, res2, res1)
})
</script>

<template>
  <main>
    <HomeSlider />

    <div class="max-w-6xl mx-auto container">
      <HomeAbout />
      <HomeFeaturedBuilds :builds="builds" />
      <HomeBlog />
      <HomeReviews />
      <HomeFAQ />
    </div>
  </main>
</template>
