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

onMounted(() => {
  fetchBuilds()
  fetchOrders()
})
</script>
<template>
  <main>
    <h1 class="font-montserrat font-black text-3xl">Mon compte</h1>
    <ProfileOrders :orders="orders" />
    <ProfileBuilds :builds="builds" />
  </main>
</template>
