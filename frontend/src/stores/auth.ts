import { reactive, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '@/services/AuthAPI'
import type { User } from '@/components/types/user'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  let user = reactive<Partial<User>>({})

  const initAuth = async () => {
    if (token.value) {
      const decodedToken: any = jwtDecode(token.value)
      const fetchedUser = await getUser(decodedToken.email)

      if (fetchedUser?.id) {
        Object.assign(user, fetchedUser)
        localStorage.setItem('userId', fetchedUser.id)
      }

      console.log(user, 'user')
    }
  }

  initAuth()

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
})
