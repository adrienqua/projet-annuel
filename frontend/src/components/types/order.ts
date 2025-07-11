import type { OrderItem } from "./orderItem"

export interface Order {
  id: string
  status: string
  orderNumber?: string
  userId: string
  address: string
  carrierName: string
  carrierPrice: string 
  subTotal: string     
  total: string        
  createdAt: Date    
  orderItems: OrderItem[]
}
