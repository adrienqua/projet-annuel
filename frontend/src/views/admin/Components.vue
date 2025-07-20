<script setup lang="ts">
import { ref, onMounted } from 'vue'

const components = ref([])
const showModal = ref(false)
const isEditing = ref(false)

const componentTypes = ref([])
const manufacturers = ref([])

const editedComponent = ref({
  id: null,
  name: '',
  price: '',
  releaseDate: '',
  imgUrl: '',
  description: '',
  typeId: null,
  manufacturerId: null,
  specs: { import: 'backoffice' },
  ocProfiles: { import: 'backoffice' },
})

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'price', label: 'Prix' },
  { key: 'releaseDate', label: 'Sortie' },
  { key: 'typeId', label: 'Type' },
  { key: 'manufacturerId', label: 'Fabricant' },
  { key: 'actions', label: 'Actions' },
]

const fetchComponents = async () => {
  const res = await fetch('http://localhost:5000/api/components')
  components.value = await res.json()
}

const fetchTypesAndManufacturers = async () => {
  const [typesRes, manuRes] = await Promise.all([
    fetch('http://localhost:5000/api/componentTypes'),
    fetch('http://localhost:5000/api/manufacturers'),
  ])
  componentTypes.value = await typesRes.json()
  manufacturers.value = await manuRes.json()
}

const openCreateModal = () => {
  editedComponent.value = {
    id: null,
    name: '',
    price: '',
    releaseDate: '',
    imgUrl: '',
    description: '',
    typeId: null,
    manufacturerId: null,
    specs: { import: 'backoffice' },
    ocProfiles: { import: 'backoffice' },
  }
  isEditing.value = false
  showModal.value = true
}

const editComponent = (row: any) => {
  editedComponent.value = { ...row.rowData }
  isEditing.value = true
  showModal.value = true
}

const saveComponent = async () => {
  const method = isEditing.value ? 'PUT' : 'POST'
  const url = isEditing.value
    ? `http://localhost:5000/api/components/${editedComponent.value.id}`
    : 'http://localhost:5000/api/components'

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedComponent.value),
  })

  showModal.value = false
  fetchComponents()
}

const deleteComponent = async (row: any) => {
  const id = row.rowData.id
  if (!id || !confirm('Supprimer ce composant ?')) return
  await fetch(`http://localhost:5000/api/components/${id}`, {
    method: 'DELETE',
  })
  fetchComponents()
}

onMounted(() => {
  fetchComponents()
  fetchTypesAndManufacturers()
})
</script>

<template>
  <button class="btn btn-secondary mb-3" @click="openCreateModal">
    Ajouter un composant
  </button>

  <VaDataTable :items="components" :columns="columns">
    <template #cell(actions)="{ row }">
      <button class="btn bg-gray-200" @click="editComponent(row)">Éditer</button>
      <button class="btn btn-error ml-2" @click="deleteComponent(row)">Supprimer</button>
    </template>
  </VaDataTable>

  <VaModal v-model="showModal" title="Composant" hide-default-actions>
    <form @submit.prevent="saveComponent" class="space-y-4 p-4">
      <div>
        <label class="label"><span class="label-text">Nom</span></label>
        <input type="text" v-model="editedComponent.name" class="input input-bordered w-full" />
      </div>

      <div>
        <label class="label"><span class="label-text">Prix</span></label>
        <input type="number" v-model="editedComponent.price" class="input input-bordered w-full" />
      </div>

      <div>
        <label class="label"><span class="label-text">Date de sortie</span></label>
        <input type="date" v-model="editedComponent.releaseDate" class="input input-bordered w-full" />
      </div>

      <div>
        <label class="label"><span class="label-text">Image (URL)</span></label>
        <input type="text" v-model="editedComponent.imgUrl" class="input input-bordered w-full" />
      </div>

      <div>
        <label class="label"><span class="label-text">Description</span></label>
        <textarea v-model="editedComponent.description" class="textarea textarea-bordered w-full" />
      </div>

      <div>
        <label class="label"><span class="label-text">Type</span></label>
        <select v-model="editedComponent.typeId" class="select select-bordered w-full">
          <option disabled value="">-- Sélectionner un type --</option>
          <option v-for="type in componentTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="label"><span class="label-text">Fabricant</span></label>
        <select v-model="editedComponent.manufacturerId" class="select select-bordered w-full">
          <option disabled value="">-- Sélectionner un fabricant --</option>
          <option v-for="manu in manufacturers" :key="manu.id" :value="manu.id">
            {{ manu.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <button type="button" class="btn btn-ghost" @click="showModal = false">Annuler</button>
        <button type="submit" class="btn btn-secondary">Enregistrer</button>
      </div>
    </form>
  </VaModal>
</template>
