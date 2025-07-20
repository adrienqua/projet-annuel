import { reactive, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'

interface User {
  id: string
  email: string
  [key: string]: any
}

const token = ref(localStorage.getItem('token'))
const user = reactive<Partial<User>>({})

if (token.value) {
  const decodedToken: any = jwtDecode(token.value)
  const fetchedUser = await getUser(decodedToken.email)

  Object.assign(user, fetchedUser)

  if (user.id) {
    localStorage.setItem('userId', user.id)
  }

  console.log(user, 'user')
}

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
