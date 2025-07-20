import 'vue3-toastify/dist/index.css'
import './assets/main.css'
import 'vuestic-ui/styles/essential.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'
import { initMatomo, trackPageView, trackSessionStart, trackSessionEnd } from './utils/matomo'

import App from './App.vue'

import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration({ router })],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^http:\/\/localhost:5000\/api/],
})
app.use(createVuestic())
app.use(createPinia())
app.use(router)

initMatomo()
trackSessionStart()
window.addEventListener('beforeunload', () => {
  trackSessionEnd()
})

router.afterEach((to) => {
  setTimeout(() => {
    const pageTitle =
      (typeof to.meta.title === 'string' && to.meta.title) ||
      (typeof to.name === 'string' && to.name) ||
      document.title
    trackPageView(pageTitle)
  }, 100)
})

app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'colored',
} as ToastContainerOptions)

app.mount('#app')
