import type { Component } from './component'

export interface BuildItem {
  id: number
  quantity: number
  price: string
  build_id: number
  component_id: number
  component?: Component
}
