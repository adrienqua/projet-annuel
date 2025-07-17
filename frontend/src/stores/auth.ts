import { reactive, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'

const token = ref(localStorage.getItem('token'))
let user = reactive({})

if (token.value) {
  const decodedToken: any = jwtDecode(token.value)
  user = await getUser(decodedToken.email)
  if (user?.id) {
    localStorage.setItem('userId', user.id)
  }

  console.log(user, 'user')
}

export function useAuth() {
  return {
    user: user,
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
