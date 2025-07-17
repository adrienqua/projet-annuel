import type { Address } from '@/components/types/address'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getAddresses = async (userId: string): Promise<Address[]> => {
  try {
    const res = await axios.get(`${API}/addresses`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAddress = async (id: number): Promise<Address> => {
  try {
    const res = await axios.get(`${API}/addresses/${id}`)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createAddress = async (data: Partial<Address>) => {
  try {
    const res = await axios.post(`${API}/addresses`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateAddress = async (id: number, data: Partial<Address>) => {
  try {
    const res = await axios.put(`${API}/addresses/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteAddress = async (id: number) => {
  try {
    await axios.delete(`${API}/addresses/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
