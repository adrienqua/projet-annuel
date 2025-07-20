<script setup lang="ts">
import ProfileBuilds from '@/components/profile/ProfileBuilds.vue'
import ProfileOrders from '@/components/profile/ProfileOrders.vue'
import type { Build } from '@/components/types/build'
import type { Order } from '@/components/types/order'
import type { User } from '@/components/types/user'
import { getBuilds } from '@/services/BuildAPI'
import { getUserAddresses, getUserOrders } from '@/services/UserAPI'
import { useAuth } from '@/stores/auth'
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileSecurity from '@/components/profile/ProfileSecurity.vue'
import { getUser } from '@/services/AuthAPI'
import type { Address } from '@/components/types/address'
import ProfileAddresses from '@/components/profile/ProfileAddresses.vue'

useHead({
  title: 'Mon compte | BuildMyPC',
  meta: [
    {
      name: 'description',
      content:
        'Gérez vos informations personnelles, vos configurations de PC et suivez vos commandes.',
    },
    { property: 'og:title', content: 'Mon compte | BuildMyPC' },
    {
      property: 'og:description',
      content:
        'Gérez vos informations personnelles, vos configurations de PC et suivez vos commandes.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'BuildMyPC' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
})

const router = useRouter()
const auth = useAuth()
const authUser = auth.user as User

const user = ref<User | null>(null)
const builds = ref<Build[]>([])
const orders = ref<Order[]>([])
const addresses = ref<Address[]>([])

const fetchBuilds = async () => {
  await getBuilds(authUser.id).then((res: Build[]) => {
    builds.value = res
  })
}

const fetchUser = async () => {
  await getUser(authUser.email).then((res: User) => {
    user.value = res
  })
}
const fetchAddresses = async () => {
  await getUserAddresses(authUser.id).then((res: Address[]) => {
    addresses.value = res
  })
}

const fetchOrders = async () => {
  await getUserOrders(authUser.id).then((res: Order[]) => {
    orders.value = res
  })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

onMounted(() => {
  fetchUser()
  fetchAddresses()
  fetchBuilds()
  fetchOrders()
})
</script>
<template>
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat font-black text-3xl">Mon compte</h1>
    <div class="flex flex-col md:flex-row gap-6">
      <ProfileAddresses :addresses="addresses" @user-updated="fetchAddresses" />
      <ProfileSecurity :user="user" @user-updated="fetchUser" />
    </div>
    <ProfileOrders :orders="orders" />
    <ProfileBuilds :builds="builds" />
    <div class="flex items-center justify-center mt-8">
      <button @click="handleLogout" type="button" class="btn bg-gray-200">Se déconnecter</button>
    </div>
  </main>
</template>
