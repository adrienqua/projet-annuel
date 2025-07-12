import type { Component } from '@/components/types/component'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getCart = async (cartItems: number[]): Promise<Component[]> => {
  try {
    const res = await axios.get(`${API}/cart`, {
      params: cartItems.length > 0 ? { cartItems: cartItems.join(',') } : {},
    })
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
