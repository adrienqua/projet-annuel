import { reactive, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'

interface MyJwtPayload {
  email: string
}

const token = ref<string | null>(localStorage.getItem('token'))
let user = reactive<any>({})

if (token.value) {
  ;(async () => {
    const decodedToken = jwtDecode<MyJwtPayload>(token.value as string)
    const fetchedUser = await getUser(decodedToken.email)
    Object.assign(user, fetchedUser)
    if (user.id) {
      localStorage.setItem('userId', user.id)
    }

    console.log(user, 'user')
  })()
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
