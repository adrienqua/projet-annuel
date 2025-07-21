import { reactive, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'
import type { User } from '@/components/types/user'

const token = ref(localStorage.getItem('token'))
const user = reactive<Partial<User>>({})

const initUser = async () => {
  if (token.value) {
    const decodedToken: any = jwtDecode(token.value)
    const fetchedUser = await getUser(decodedToken.email)
    if (fetchedUser?.id) {
      localStorage.setItem('userId', fetchedUser.id)
      Object.assign(user, fetchedUser)
    }
    console.log(user, 'user')
  }
}

initUser()

export function useAuth() {
  return {
    user,
    setToken(value: string) {
      token.value = value
      localStorage.setItem('token', value)
    },
    clearToken() {
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
  }
}
