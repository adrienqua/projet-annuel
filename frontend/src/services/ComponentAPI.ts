import type { Component } from '@/components/types/component'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getComponents = async (manufacturer_id?: number): Promise<Component[]> => {
  try {
    const res = await axios.get(`${API}/components`, {
      params: manufacturer_id ? { manufacturer_id } : {},
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getComponent = async (id: number): Promise<Component> => {
  try {
    const res = await axios.get(`${API}/components/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createComponent = async (component: Partial<Component>) => {
  try {
    const res = await axios.post(`${API}/components`, component)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateComponent = async (id: number, component: Partial<Component>) => {
  try {
    const res = await axios.put(`${API}/components/${id}`, component)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteComponent = async (id: number) => {
  try {
    await axios.delete(`${API}/components/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
