<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VaDataTable, VaButton, VaModal, VaInput, VaSelect, VaForm } from 'vuestic-ui'

const users = ref([])
const showModal = ref(false)
const isEditing = ref(false)

const editedUser = ref({
  id: null,
  name: '',
  email: '',
  password: '',
  role: 'USER',
})

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  { key: 'actions', label: 'Actions' },
]

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/users')
    users.value = await res.json()
  } catch (e) {
    console.error('Erreur fetch users:', e)
  }
}

const openCreateModal = () => {
  editedUser.value = { id: null, name: '', email: '', password: '', role: 'USER' }
  isEditing.value = false
  showModal.value = true
}

const editUser = (user: any) => {
  editedUser.value = { ...user, password: '' }
  isEditing.value = true
  showModal.value = true
}

const saveUser = async () => {
  const method = isEditing.value ? 'PUT' : 'POST'
  const url = isEditing.value
    ? `http://localhost:5000/api/users/${editedUser.value.id}`
    : 'http://localhost:5000/api/users'

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      isEditing.value
        ? Object.fromEntries(
          Object.entries(editedUser.value).filter(([key, val]) => !(key === 'password' && val === ''))
        )
        : editedUser.value
    )

  })

  showModal.value = false
  fetchUsers()
}

const deleteUser = async (user: any) => {
  if (!user.id || typeof user.id !== 'string') {
    console.error('ID invalide pour suppression', user)
    return
  }
  if (!confirm(`Supprimer ${user.name} ?`)) return
  await fetch(`http://localhost:5000/api/users/${user.id}`, {
    method: 'DELETE',
  })
  fetchUsers()
}

onMounted(fetchUsers)
</script>

<template>
  <button class="btn btn-secondary mb-3" @click="openCreateModal">
    Ajouter un utilisateur
  </button>

  <VaDataTable :items="users" :columns="columns">
    <template #cell(actions)="{ row }">
      <button class="btn bg-gray-200 " @click="editUser(row.rowData)">Éditer</button>
      <button class="btn btn-error ml-2" @click="deleteUser(row.rowData)">Supprimer</button>
       </template>
  </VaDataTable>

  <VaModal v-model="showModal" title="Utilisateur" hide-default-actions>
    <form @submit.prevent="saveUser" class="space-y-4 p-4">
      <div>
        <label class="label"><span class="label-text">Nom</span></label>
        <input type="text" v-model="editedUser.name" class="input input-bordered w-full" placeholder="Jean Dupont" />
      </div>

      <div>
        <label class="label"><span class="label-text">Email</span></label>
        <input type="email" v-model="editedUser.email" class="input input-bordered w-full" placeholder="exemple@mail.com" />
      </div>

      <div>
        <label class="label"><span class="label-text">Mot de passe</span></label>
        <input type="password" v-model="editedUser.password" class="input input-bordered w-full" placeholder="••••••••" />
      </div>

      <div>
        <label class="label"><span class="label-text">Rôle</span></label>
        <select v-model="editedUser.role" class="select select-bordered w-full">
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Administrateur</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <button type="button" class="btn btn-ghost" @click="showModal = false">Annuler</button>
        <button type="submit" class="btn btn-secondary">Enregistrer</button>
      </div>
    </form>
  </VaModal>

</template>
