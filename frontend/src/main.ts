import 'vue3-toastify/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initMatomo, trackPageView, trackSessionStart, trackSessionEnd } from './utils/matomo'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const app = createApp(App)

app.use(createPinia())
app.use(router)

initMatomo()
trackSessionStart()
window.addEventListener('beforeunload', () => {
  trackSessionEnd()
})

router.afterEach((to, from) => {
  setTimeout(() => {
    trackPageView(to.meta.title || to.name || document.title)
  }, 100)
})

app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'colored',
} as ToastContainerOptions)

app.mount('#app')
