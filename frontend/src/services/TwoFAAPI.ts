import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const setup2FA = async (userId: string) => {
  const res = await axios.post(`${API}/2fa/setup`, { userId })
  return res.data
}

export const verify2FA = async (userId: string, token: string) => {
  const res = await axios.post(`${API}/2fa/verify`, { userId, token })
  return res.data
}
