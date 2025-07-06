import type { Build } from '@/components/types/build'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getBuilds = async (): Promise<Build[]> => {
  try {
    const res = await axios.get(`${API}/builds`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getBuild = async (id: number): Promise<Build> => {
  try {
    const res = await axios.get(`${API}/builds/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createBuild = async (data: Partial<Build>) => {
  try {
    const res = await axios.post(`${API}/builds`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateBuild = async (id: number, data: Partial<Build>) => {
  try {
    const res = await axios.put(`${API}/builds/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteBuild = async (id: number) => {
  try {
    await axios.delete(`${API}/builds/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
