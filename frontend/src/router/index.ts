import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import ComponentDetail from '@/pages/ComponentDetail.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/component/:id',
    name: 'ComponentDetail',
    component: ComponentDetail,
  },
  {
    path: '/compare',
    name: 'ComponentCompare',
    component: () => import('@/pages/ComponentCompare.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

