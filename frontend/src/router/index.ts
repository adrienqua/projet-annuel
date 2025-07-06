import Login from '@/components/Login.vue'
import ComponentDetail from '@/pages/ComponentDetail.vue'
import BuilderView from '@/views/BuilderView.vue'
import HomeView from '@/views/HomeView.vue'
import ComponentCompare from '@/pages/ComponentCompare.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'

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
    path: '/profil',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/component/:id',
    name: 'ComponentDetail',
    component: ComponentDetail,
  },
  {
    path: '/compare',
    name: 'ComponentCompare',
    component: ComponentCompare,
  },
  {
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
