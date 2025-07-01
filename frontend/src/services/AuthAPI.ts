import type { User } from '@/components/types/User'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const register = async (email: string, password: string) => {
  try {
    return await axios.post(`${API}/register`, { email, password })
  } catch (error) {
    console.error(error)
  }
}

export const login = async (email: string, password: string) => {
  try {
    return await axios.post(`${API}/auth/login`, { email, password })
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (email: string): Promise<User> => {
  try {
    const user = await axios.get(`${API}/auth/user?email=${email}`)
    return user.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
