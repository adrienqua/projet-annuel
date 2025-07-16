import type { Build } from '@/components/types/build'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getCarriers = async (): Promise<Build[]> => {
  try {
    const res = await axios.get(`${API}/carriers`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
