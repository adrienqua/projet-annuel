import type { Component } from './component'

export interface OrderItem {
  id: string
  OrderId: string
  quantity: number
  price: string
  product: string
  componentId: number
  component?: Component
}
