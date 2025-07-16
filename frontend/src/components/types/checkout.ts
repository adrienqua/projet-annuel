export interface CheckoutOrder {
  userId: string
  userEmail: string
  address: string
  carrierName: string
  carrierPrice: number
  products: number[]
}
