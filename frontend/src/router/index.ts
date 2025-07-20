import Login from '@/components/Login.vue'
import ComponentDetail from '@/pages/ComponentDetail.vue'
import BuilderView from '@/views/BuilderView.vue'
import HomeView from '@/views/HomeView.vue'
import ComponentCompare from '@/pages/ComponentCompare.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import CheckoutSuccessView from '@/views/CheckoutSuccessView.vue'
import CheckoutCancelView from '@/views/CheckoutCancelView.vue'

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
    path: '/account',
    name: 'Account',
    component: ProfileView,
  },
  {
    path: '/component/:id',
    name: 'ComponentDetail',
    component: ComponentDetail,
  },
  {
    path: '/2fa/setup',
    component: () => import('@/pages/SetupTwoFa.vue'),
  },
  {
    path: '/compare',
    name: 'ComponentCompare',
    component: ComponentCompare,
  },
  {
    path: '/checkout/success',
    name: 'checkoutSuccess',
    component: CheckoutSuccessView,
  },
  {
    path: '/checkout/canceled',
    name: 'checkoutCancel',
    component: CheckoutCancelView,
  },
  {
    path: '/builder',
    name: 'Builder',
    component: BuilderView,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'users',
        component: () => import('@/views/admin/Users.vue'),
      },
      {
        path: 'components',
        component: () => import('@/views/admin/Components.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue'),
      },
    ]
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
