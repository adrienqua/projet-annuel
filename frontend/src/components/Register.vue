<script setup lang="ts">
import { login, register } from '@/services/AuthAPI'
import { useAuth } from '@/stores/auth'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user } = useAuth() as any

const email = ref<string>('')
const name = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const isSubmitting = ref<boolean>(false)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

interface RegisterResponse {
  data: {
    token: string
  }
}

onMounted(() => {
  if (user.email) {
    router.push('/')
  }
})

const passwordValidation = computed(() => {
  const pwd = password.value
  return {
    length: pwd.length >= 8,
    hasNumber: /\d/.test(pwd),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    isValid: pwd.length >= 8 && /\d/.test(pwd) && /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  }
})

const passwordMatch = computed(() => {
  return password.value === confirmPassword.value
})

const isFormValid = computed(() => {
  return email.value !== '' && passwordValidation.value.isValid && passwordMatch.value
})

const handleRegister = async () => {
  if (!isFormValid.value) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await register(email.value, password.value, name.value)
    successMessage.value = 'Inscription réussie ! Redirection vers la connexion...'

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error: any) {
    if (error.response?.status === 400) {
      errorMessage.value = 'Un utilisateur avec cet email existe déjà'
    } else {
      errorMessage.value = "Une erreur est survenue lors de l'inscription"
    }
  } finally {
    isSubmitting.value = false
  }
}

let chainToLogin = false
const handleLogin = (event: MouseEvent) => {
  const registerBoard = document.getElementById('register-board')
  registerBoard && registerBoard.classList.add('page-exit')

  chainToLogin = true
  setTimeout(() => {
    router.push('/login')
  }, 380)
}
</script>

<style scoped>
#register-board {
  transition: all 0.4s;
}

.page-entry {
  animation: rotateAndFade 0.4s ease-in-out forwards;
  transform: rotateY(0deg);
}

@keyframes rotateAndFade {
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  50% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
}

.page-exit {
  animation: rotateAndFadeExit 0.4s ease-in-out forwards;
  transform: rotateY(0deg);
}

@keyframes rotateAndFadeExit {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateY(90deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(90deg);
    opacity: 0;
  }
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 280px;
  background-color: #555;
  color: white;
  text-align: left;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -140px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  line-height: 1.4;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.password-strength {
  font-size: 12px;
  margin-top: 5px;
}

.strength-item {
  margin: 2px 0;
}

.strength-item.valid {
  color: #10b981;
}

.strength-item.invalid {
  color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.success-message {
  color: #10b981;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.input-error {
  border-color: #ef4444 !important;
}

.input-success {
  border-color: #10b981 !important;
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div id="register-board" class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md page-entry">
      <h1 class="text-2xl font-bold text-center mb-6">S'inscrire</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          v-model="name"
          type="name"
          placeholder="Prénom et Nom"
          required
          class="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div class="tooltip w-full">
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400',
              password.length > 0
                ? passwordValidation.isValid
                  ? 'input-success border-green-500'
                  : 'input-error border-red-500'
                : 'border-green-300',
            ]"
          />
          <span class="tooltiptext">
            <strong>Exigences du mot de passe :</strong><br />
            • Au moins 8 caractères<br />
            • Au moins 1 chiffre<br />
            • Au moins 1 caractère spécial (!@#$%^&*...)
          </span>
        </div>

        <div v-if="password.length > 0" class="password-strength">
          <div :class="['strength-item', passwordValidation.length ? 'valid' : 'invalid']">
            ✓ Au moins 8 caractères {{ passwordValidation.length ? '✓' : '✗' }}
          </div>
          <div :class="['strength-item', passwordValidation.hasNumber ? 'valid' : 'invalid']">
            ✓ Au moins 1 chiffre {{ passwordValidation.hasNumber ? '✓' : '✗' }}
          </div>
          <div :class="['strength-item', passwordValidation.hasSpecialChar ? 'valid' : 'invalid']">
            ✓ Au moins 1 caractère spécial {{ passwordValidation.hasSpecialChar ? '✓' : '✗' }}
          </div>
        </div>

        <div class="tooltip w-full">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            required
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400',
              confirmPassword.length > 0
                ? passwordMatch
                  ? 'input-success border-green-500'
                  : 'input-error border-red-500'
                : 'border-green-300',
            ]"
          />
          <span class="tooltiptext"> Veuillez retaper le même mot de passe pour confirmer </span>
        </div>

        <div v-if="confirmPassword.length > 0" class="password-strength">
          <div :class="['strength-item', passwordMatch ? 'valid' : 'invalid']">
            {{
              passwordMatch
                ? '✓ Les mots de passe correspondent'
                : '✗ Les mots de passe ne correspondent pas'
            }}
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <button
          @click="handleLogin"
          type="button"
          class="inline-block w-full text-end cursor-pointer text-gray-800 hover:text-secondary transition-all duration-200"
        >
          Se connecter
        </button>

        <button
          type="submit"
          :disabled="!isFormValid || isSubmitting"
          :class="[
            'w-full py-2 rounded-lg transition',
            isFormValid && !isSubmitting
              ? 'bg-secondary-500 text-white hover:bg-secondary-600 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          {{ isSubmitting ? 'Inscription...' : "S'inscrire" }}
        </button>
      </form>
    </div>
  </div>
</template>
