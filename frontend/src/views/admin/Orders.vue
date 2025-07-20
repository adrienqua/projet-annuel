<script setup lang="ts">
import type { Carrier } from '@/components/types/carrier'
import type { Order } from '@/components/types/order'
import type { User } from '@/components/types/user'
import { formatPrice } from '@/utils/formatPrice'
import { useHead } from '@vueuse/head'
import { ref, onMounted } from 'vue'

useHead({
  title: 'Admin Commandes | BuildMyPC',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

const API = import.meta.env.VITE_API_URL

const orders = ref<Order[]>([])
const users = ref<User[]>([])
const carriers = ref<Carrier[]>([])

const showModal = ref(false)
const isEditing = ref(false)

const editedOrder = ref({
  id: null,
  userId: users.value[0]?.id || '',
  address: '',
  carrierName: carriers.value[0]?.name || '',
  carrierPrice: carriers.value[0]?.price || 0,
  status: 'En attente',
  subTotal: 1079.9,
  total: 1094.9,
  componentId: 4,
  orderItems: [
    {
      product: 'NVIDIA GeForce RTX 4080',
      quantity: 1,
      price: '1079.90',
      componentId: 4,
    },
  ],
})

const statuses = ['En attente', 'En cours', 'Expédiée', 'Livrée', 'Annulée']

const fetchOrders = async () => {
  const res = await fetch(`${API}/orders`)
  orders.value = await res.json()
}

const fetchUsersAndCarriers = async () => {
  const [usersRes, carriersRes] = await Promise.all([
    fetch(`${API}/users`),
    fetch(`${API}/carriers`),
  ])
  users.value = await usersRes.json()
  carriers.value = await carriersRes.json()
}

const openCreateModal = () => {
  editedOrder.value = {
    id: null,
    userId: users.value[0]?.id || '',
    address: '',
    carrierName: carriers.value[0]?.name || '',
    carrierPrice: carriers.value[0]?.price || 0,
    status: 'En attente',
    subTotal: 1079.9,
    total: 1094.9,
    componentId: 4,
    orderItems: [
      {
        product: 'NVIDIA GeForce RTX 4080',
        quantity: 1,
        price: '1079.90',
        componentId: 4,
      },
    ],
  }
  isEditing.value = false
  showModal.value = true
}

const editOrder = (order: Order) => {
  //editedOrder.value = { ...order }
  isEditing.value = true
  showModal.value = true
}

const saveOrder = async () => {
  const method = isEditing.value ? 'PUT' : 'POST'
  const url = isEditing.value ? `${API}/orders/${editedOrder.value.id}` : `${API}/orders`

  const payload = {
    ...editedOrder.value,
    carrierPrice: String(editedOrder.value.carrierPrice),
    subTotal: String(editedOrder.value.subTotal),
    total: String(editedOrder.value.total),
    orderItems: editedOrder.value.orderItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: String(item.price),
      componentId: Number(item.componentId),
    })),
  }

  console.log('Payload envoyé :', JSON.stringify(payload, null, 2)) // 🐞 debug

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  showModal.value = false
  fetchOrders()
}

const deleteOrder = async (order: Order) => {
  if (!confirm(`Supprimer cette commande ?`)) return
  await fetch(`${API}/orders/${order.id}`, {
    method: 'DELETE',
  })
  fetchOrders()
}

onMounted(() => {
  fetchOrders()
  fetchUsersAndCarriers()
})
</script>

<template>
  <!--  <button class="btn btn-secondary mb-3" @click="openCreateModal">-->
  <!--    Ajouter une commande-->
  <!--  </button>-->

  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Adresse</th>
          <th>Transporteur</th>
          <th>Prix Transport</th>
          <th>Status</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order?.user?.name }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.carrierName }}</td>
          <td>{{ formatPrice(order.carrierPrice) }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatPrice(order.total) }}</td>
          <td>
            <button class="btn btn-sm bg-gray-200" @click="editOrder(order)">Éditer</button>
            <button class="btn btn-sm btn-error ml-2" @click="deleteOrder(order)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <dialog class="modal" :open="showModal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ isEditing ? 'Modifier' : 'Nouvelle' }} commande</h3>
      <form @submit.prevent="saveOrder" class="space-y-4 py-4">
        <div>
          <label class="label">Utilisateur</label>
          <select v-model="editedOrder.userId" class="select select-bordered w-full">
            <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>

        <div>
          <label class="label">Adresse</label>
          <input type="text" class="input input-bordered w-full" v-model="editedOrder.address" />
        </div>

        <div>
          <label class="label">Transporteur</label>
          <select v-model="editedOrder.carrierName" class="select select-bordered w-full">
            <option v-for="c in carriers" :key="c.name" :value="c.name">{{ c.name }}</option>
          </select>
        </div>

        <div>
          <label class="label">Prix Transport</label>
          <input
            type="number"
            class="input input-bordered w-full"
            v-model="editedOrder.carrierPrice"
          />
        </div>

        <div>
          <label class="label">Status</label>
          <select v-model="editedOrder.status" class="select select-bordered w-full">
            <option v-for="s in statuses" :key="s">{{ s }}</option>
          </select>
        </div>

        <div>
          <label class="label">Sous-total</label>
          <input type="number" class="input input-bordered w-full" v-model="editedOrder.subTotal" />
        </div>

        <div>
          <label class="label">Total</label>
          <input type="number" class="input input-bordered w-full" v-model="editedOrder.total" />
        </div>

        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" class="btn btn-ghost" @click="showModal = false">Annuler</button>
          <button type="submit" class="btn btn-secondary">Enregistrer</button>
        </div>
      </form>
    </div>
  </dialog>
</template>
