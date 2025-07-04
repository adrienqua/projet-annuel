import Login from '@/components/Login.vue'
import ComponentDetail from '@/pages/ComponentDetail.vue'
import BuilderView from '@/views/BuilderView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
    path: '/builder',
    name: 'Builder',
    component: BuilderView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

