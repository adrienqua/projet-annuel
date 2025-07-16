import type { CheckoutOrder } from '@/components/types/checkout'
import type { Order } from '@/components/types/order'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const checkoutSuccess = async (data: { orderId: string; sessionId: string }) => {
  try {
    const res = await axios.post(`${API}/checkout/success`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const checkoutOrder = async (datas: CheckoutOrder) => {
  try {
    const res = await axios.post(`${API}/checkout`, datas)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
