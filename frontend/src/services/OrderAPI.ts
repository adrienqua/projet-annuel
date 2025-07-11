import type { Order } from '@/components/types/order'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const res = await axios.get(`${API}/builds${userId && `?userId=${userId}`}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getOrder = async (id: number): Promise<Order> => {
  try {
    const res = await axios.get(`${API}/builds/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createOrder = async (data: Partial<Order>) => {
  try {
    const res = await axios.post(`${API}/builds`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateOrder = async (id: number, data: Partial<Order>) => {
  try {
    const res = await axios.put(`${API}/builds/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteOrder = async (id: number) => {
  try {
    await axios.delete(`${API}/builds/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
