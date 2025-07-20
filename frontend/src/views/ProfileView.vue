<script setup lang="ts">
import ProfileBuilds from '@/components/profile/ProfileBuilds.vue'
import ProfileOrders from '@/components/profile/ProfileOrders.vue'
import type { Build } from '@/components/types/build'
import type { Order } from '@/components/types/order'
import type { User } from '@/components/types/user'
import { getBuilds } from '@/services/BuildAPI'
import { getUserOrders } from '@/services/UserAPI'
import { useAuth } from '@/stores/auth'
import { formatPrice } from '@/utils/formatPrice'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()
const user = auth.user as User

const builds = ref<Build[]>([])
const orders = ref<Order[]>([])

const fetchBuilds = async () => {
  await getBuilds(user.id).then((res: Build[]) => {
    builds.value = res
  })
}

const fetchOrders = async () => {
  await getUserOrders(user.id).then((res: Order[]) => {
    orders.value = res
  })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

const setupTwoFa = () => {
  router.push('/2fa/setup')
}
onMounted(() => {
  fetchBuilds()
  fetchOrders()
})
</script>
<template>
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat font-black text-3xl">Mon compte</h1>
    <ProfileOrders :orders="orders" />
    <ProfileBuilds :builds="builds" />
    <div class="flex items-center justify-center mt-8">
      <button @click="handleLogout" type="button" class="btn bg-gray-200">Se déconnecter</button>
    </div>
    <div v-if="!user.isTwoFA" class="flex items-center justify-center mt-6">
      <button @click="setupTwoFa" class="btn bg-secondary-400 text-white">
        Gestion de la double authentification
      </button>
    </div>

  </main>
</template>
