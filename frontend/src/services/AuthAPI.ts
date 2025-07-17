import type { User } from '@/components/types/user'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const register = async (email: string, password: string, name: string) => {
  try {
    return await axios.post(`${API}/auth/register`, { email, password, name })
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
