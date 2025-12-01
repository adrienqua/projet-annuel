import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import BuilderView from '@/views/BuilderView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import CheckoutSuccessView from '@/views/CheckoutSuccessView.vue'
import CheckoutCancelView from '@/views/CheckoutCancelView.vue'
import ComponentDetailView from '@/views/ComponentDetailView.vue'
import ComponentCompareView from '@/views/ComponentCompareView.vue'
import ProductListView from '@/views/ProductListView.vue'
import CategoryListView from '@/views/CategoryListView.vue'
import { useAuth } from '@/stores/auth'

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
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/account',
    name: 'Account',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/components/:slug',
    name: 'ComponentDetail',
    component: ComponentDetailView,
  },
  {
    path: '/2fa/setup',
    component: () => import('@/pages/SetupTwoFa.vue'),
  },
  {
    path: '/compare',
    name: 'ComponentCompare',
    component: ComponentCompareView,
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
    path: '/products',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/products/:slug',
    name: 'CategoryList',
    component: CategoryListView,
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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()

  while (!auth.isReady) {
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  const isLoggedIn = !!auth.user?.email
  const isAdmin = auth.user?.role === 'ADMIN'

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return next('/')
  }

  next()
})

export default router
