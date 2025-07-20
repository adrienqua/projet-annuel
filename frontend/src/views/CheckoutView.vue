<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Carrier } from '@/components/types/carrier'
import type { Component } from '@/components/types/component'
import Cart from '@/components/cart/Cart.vue'
import { getCart } from '@/services/CartAPI'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'
import type { Address } from '@/components/types/address'
import CheckoutAddress from '@/components/checkout/CheckoutAddress.vue'
import CheckoutCarrier from '@/components/checkout/CheckoutCarrier.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'
import { getCarriers } from '@/services/CarrierAPI'
import { getUserAddresses } from '@/services/UserAPI'
import { useAuth } from '@/stores/auth'
import type { User } from '@/components/types/user'
import { checkoutOrder } from '@/services/CheckoutAPI'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Finaliser ma commande | BuildMyPC',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

const { cartProducts } = useCartStore()
const auth = useAuth()
const user = auth.user as User
const router = useRouter()

const products = ref<Component[]>([])
const carriers = ref<Carrier[]>([])
const addresses = ref<Address[]>([])
const selectedCarrier = ref<Carrier | null>(null)
const selectedAddress = ref<Address | null>(null)

watch(
  cartProducts,
  async (newCartProducts) => {
    const components = await getCart(newCartProducts)

    products.value = components
  },
  { immediate: true },
)

onMounted(async () => {
  try {
    carriers.value = await getCarriers()
    addresses.value = await getUserAddresses(user.id)
  } catch (error) {
    console.error(error)
  }
})

const subTotal = computed(() => {
  return (
    products.value?.reduce((total, product) => {
      const quantity = cartProducts.filter((cart) => cart === product.id).length
      console.log('Quantity:', quantity, total)
      return (total * 100 + Number(product.price) * 100 * quantity) / 100
    }, 0) || 0
  )
})

const totalPrice = computed(() => {
  if (selectedCarrier.value) {
    return (subTotal.value * 100 + Number(selectedCarrier.value.price) * 100) / 100
  }
  return subTotal.value
})

const handleCheckoutSubmit = async () => {
  try {
    const checkout = await checkoutOrder({
      userId: user.id,
      userEmail: user.email,
      address: selectedAddress.value
        ? `${selectedAddress.value.name}\n${selectedAddress.value.address}, ${selectedAddress.value.postalCode} ${selectedAddress.value.city}\n${selectedAddress.value.country}`
        : '',
      carrierName: selectedCarrier.value ? selectedCarrier.value.name : '',
      carrierPrice: selectedCarrier.value ? Number(selectedCarrier.value.price) : 0,
      products: cartProducts,
    })
    window.location.href = checkout.url
  } catch (error) {
    console.error('Checkout error:', error)
  }
}
</script>
<template>
  <main class="mx-auto container max-w-6xl px-4 pt-12">
    <h1 class="font-montserrat font-black text-3xl mb-6">Ma commande</h1>
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <div class="w-full md:w-3/4">
        <Cart :products="products" :isEditQuantity="false" />
        <div class="mt-4 flex flex-col md:flex-row gap-4">
          <CheckoutAddress v-model="selectedAddress" :addresses="addresses" />
          <CheckoutCarrier v-model="selectedCarrier" :carriers="carriers" />
        </div>
      </div>
      <CheckoutSummary
        :subTotal="subTotal"
        :totalPrice="totalPrice"
        :isPayment="!selectedCarrier || !selectedAddress ? false : true"
        :selectedCarrier="selectedCarrier"
        :handleCheckoutSubmit="handleCheckoutSubmit"
      />
    </div>
  </main>
</template>
