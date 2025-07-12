import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<number[]>([])
  const counter = ref(0)

  const handleAddToCart = (products: number[]) => {
    cartProducts.value.push(...products)
    counter.value++
  }

  const handleSubstractToCart = (product: number) => {
    const index = cartProducts.value.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(product),
    )
    if (index > -1) {
      cartProducts.value.splice(index, 1)
      counter.value++
    }
  }

  const handleEmptyCart = () => {
    cartProducts.value = []
    localStorage.setItem('cart', JSON.stringify(cartProducts.value))
  }

  const getCart = () => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    const storedCart = localStorage.getItem('cart')
    cartProducts.value = storedCart ? JSON.parse(storedCart) : []
    console.log('storedCart', storedCart, cartProducts.value)
  }

  watch(counter, () => {
    localStorage.setItem('cart', JSON.stringify(cartProducts.value))
    if (cartProducts.value.length === 0) {
      const storedCart = localStorage.getItem('cart')
      cartProducts.value = storedCart ? JSON.parse(storedCart) : []
    }
  })

  getCart()

  return {
    cartProducts,
    handleAddToCart,
    handleSubstractToCart,
    handleEmptyCart,
  }
})
