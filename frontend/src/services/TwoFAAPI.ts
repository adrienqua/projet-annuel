import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const setup2FA = async (userId: string) => {
  const res = await axios.get(`${API}/twofa/setup`, {
    params: { userId },
  })
  return res.data
}

export const verify2FA = async (userId: string, token: string) => {
  const res = await axios.post(`${API}/twofa/verify`, {
    userId,
    token,
  })
  return res.data
}

export const activate2FA = async (userId: string, token: string) => {
  const res = await axios.post(`${API}/twofa/verify`, { userId, token })
  return res.data
}

export const verifyLogin2FA = async (userId: string, token: string) => {
  const res = await axios.post(`${API}/twofa/verify-login`, { userId, token })
  return res.data
}
