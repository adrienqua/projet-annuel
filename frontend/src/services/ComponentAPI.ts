// src/api/ComponentAPI.ts
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getAllComponents = async () => {
  try {
    const res = await axios.get(`${API}/components`)
    return res.data
  } catch (error) {
    console.error('Erreur lors du chargement des composants :', error)
    return []
  }
}

export const getComponentById = async (id: number) => {
  try {
    const response = await axios.get(`${API}/components/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la récupération du composant avec l'ID ${id}`, error)
    throw error
  }
}
