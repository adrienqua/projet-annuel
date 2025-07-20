<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import Modal from '../ui/Modal.vue'
import type { Address } from '../types/address'
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress as deleteAddressApi,
} from '@/services/AddressAPI'
import { useAuth } from '@/stores/auth'
import type { User } from '../types/user'

const auth = useAuth()
const user = auth.user as User

const props = defineProps<{
  addresses: Address[]
}>()
const emit = defineEmits<{
  (e: 'user-updated'): void
}>()

const modalRef = ref<{ open: () => void; close: () => void } | null>(null)
const editingAddress = ref<Address | null>(null)
const form = ref<Address>({
  id: 0,
  label: '',
  name: '',
  phone: '',
  address: '',
  addressComplement: '',
  postalCode: '',
  city: '',
  country: '',
  userId: user.id,
})

function openModal(address?: Address) {
  if (address) {
    form.value = { ...address }
    editingAddress.value = address
  } else {
    form.value = {
      id: 0,
      label: '',
      name: '',
      phone: '',
      address: '',
      addressComplement: '',
      postalCode: '',
      city: '',
      country: '',
      userId: user.id,
    }
    editingAddress.value = null
  }
  console.log('rdegui')
  modalRef.value?.open()
}

async function saveAddress() {
  try {
    if (editingAddress.value) {
      await updateAddress(form.value.id, form.value)
      toast.success('Adresse modifiée !')
    } else {
      await createAddress(form.value)
      toast.success('Adresse ajoutée !')
    }
    emit('user-updated')
    modalRef.value?.close()
  } catch {
    toast.error('Erreur lors de la sauvegarde')
  }
}

async function handleDeleteAddress(id: number) {
  try {
    await deleteAddressApi(id)
    toast.success('Adresse supprimée !')
    emit('user-updated')
  } catch {
    toast.error('Erreur lors de la suppression')
  }
}
</script>

<template>
  <div class="flex flex-col w-1/2 mt-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-montserrat font-black">Adresses</h2>
      <button class="btn btn-sm btn-secondary" @click="openModal()">Ajouter une adresse</button>
    </div>
    <div v-if="addresses.length === 0">
      <p>Vous n'avez pas d'adresses.</p>
    </div>
    <div v-else class="flex max-w-full md:max-w-2xl flex-col bg-white rounded-3xl shadow-md p-6">
      <ul>
        <li
          v-for="address in addresses"
          :key="address.id"
          class="mb-2 flex justify-between items-between border-b border-gray-100 py-4"
        >
          <span class="text-gray-600">
            <span class="text-black font-semibold">{{ address.label }}</span> -
            {{ address.address }}, {{ address.city }} ({{ address.country }})
          </span>
          <span class="text-right flex flex-col gap-1">
            <button class="btn btn-sm btn-gray-200 mr-2" @click="openModal(address)">
              Modifier
            </button>
            <button class="btn btn-sm btn-error" @click="handleDeleteAddress(address.id)">
              Supprimer
            </button>
          </span>
        </li>
      </ul>
    </div>
    <Modal ref="modalRef" title="Adresse" class="font-medium">
      <form @submit.prevent="saveAddress">
        <label class="block mb-1 font-semibold">Libellé</label>
        <input
          v-model="form.label"
          placeholder="Libellé"
          class="mb-2 input input-bordered w-full"
        />
        <label class="block mb-1 font-semibold">Nom</label>
        <input v-model="form.name" placeholder="Nom" class="mb-2 input input-bordered w-full" />
        <label class="block mb-1 font-semibold">Téléphone</label>
        <input
          v-model="form.phone"
          placeholder="Téléphone"
          class="mb-2 input input-bordered w-full"
        />
        <label class="block mb-1 font-semibold">Adresse</label>
        <input
          v-model="form.address"
          placeholder="Adresse"
          class="mb-2 input input-bordered w-full"
        />
        <label class="block mb-1 font-semibold">Complément</label>
        <input
          v-model="form.addressComplement"
          placeholder="Complément"
          class="mb-2 input input-bordered w-full"
        />
        <label class="block mb-1 font-semibold">Code postal</label>
        <input
          v-model="form.postalCode"
          placeholder="Code postal"
          class="mb-2 input input-bordered w-full"
        />
        <label class="block mb-1 font-semibold">Ville</label>
        <input v-model="form.city" placeholder="Ville" class="mb-2 input input-bordered w-full" />
        <label class="block mb-1 font-semibold">Pays</label>
        <input v-model="form.country" placeholder="Pays" class="mb-2 input input-bordered w-full" />
        <button type="submit" class="btn btn-secondary mt-2">Enregistrer</button>
      </form>
    </Modal>
  </div>
</template>
