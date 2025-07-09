<script setup lang="ts">
import type { Build } from '@/components/types/build'
import type { User } from '@/components/types/User'
import { getBuilds } from '@/services/BuildAPI'
import { useAuth } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const auth = useAuth()
const user = auth.user as User

const builds = ref<Build[]>([])

const fetchBuilds = async () => {
  await getBuilds(user.id).then((res: Build[]) => {
    builds.value = res
  })
}

onMounted(() => {
  fetchBuilds()
})
</script>
<template>
  <main>
    <h1 class="font-extrabold text-4xl">Profil</h1>
    <div class="mt-6">
      <h2 class="text-2xl font-extrabold mb-4">Mes configurations</h2>
      <div v-if="builds.length === 0"><Loader /></div>
      <div v-else>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li
            v-if="builds"
            v-for="build in builds"
            :key="build.id"
            class="mb-2 bg-white rounded-3xl p-6 shadow-md"
          >
            <div class="flex justify-between">
              <h3 class="text-gray-700 font-semibold">
                {{ build.name }}
              </h3>
              <span class="text-secondary-400 font-semibold">{{ build.price }} €</span>
            </div>
            <ul>
              <li v-for="component in build.items" :key="component.id">
                <div class="flex justify-between items-center gap-2">
                  <img
                    :src="component?.component?.img_url || '/img/components/placeholder.jpg'"
                    :alt="component?.component?.name"
                    class="w-10 h-10 object-cover rounded-lg"
                  />
                  <span class="text-gray-600 w-3/4">{{ component?.component?.name }}</span>
                  <span class="text-gray-500">x{{ component.quantity }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
