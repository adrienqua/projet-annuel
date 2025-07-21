import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'
import type { User } from '@/components/types/user'

const token = ref<string | null>(localStorage.getItem('token'))
const user = ref<Partial<User>>({})

const initUser = async () => {
  if (token.value) {
    try {
      const decodedToken: any = jwtDecode(token.value)
      const fetchedUser = await getUser(decodedToken.email)

      if (fetchedUser?.id) {
        user.value = fetchedUser
        localStorage.setItem('userId', fetchedUser.id)
      }
    } catch (err) {
      console.error('Erreur auth:', err)
      clearToken()
    }
  }
}

const setToken = (value: string) => {
  token.value = value
  localStorage.setItem('token', value)
}

const clearToken = () => {
  token.value = null
  user.value = {}
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}

export function useAuth() {
  return {
    token,
    user,
    initUser,
    setToken,
    clearToken,
  }
}
