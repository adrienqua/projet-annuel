import type { ComponentType } from '@/components/types/componentType'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getComponentTypes = async (): Promise<ComponentType[]> => {
  try {
    const res = await axios.get(`${API}/componentTypes`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getComponentType = async (id: number): Promise<ComponentType> => {
  try {
    const res = await axios.get(`${API}/componentTypes/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createComponentType = async (data: Partial<ComponentType>) => {
  try {
    const res = await axios.post(`${API}/componentTypes`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateComponentType = async (id: number, data: Partial<ComponentType>) => {
  try {
    const res = await axios.put(`${API}/componentTypes/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteComponentType = async (id: number) => {
  try {
    await axios.delete(`${API}/componentTypes/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
