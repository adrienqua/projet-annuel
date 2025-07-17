import type { Address } from '@/components/types/address'
import type { Order } from '@/components/types/order'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getUserAddresses = async (userId: string): Promise<Address[]> => {
  try {
    const res = await axios.get(`${API}/users/${userId}/addresses`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const res = await axios.get(`${API}/users/${userId}/orders`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
