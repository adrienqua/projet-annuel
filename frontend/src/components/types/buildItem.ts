import type { Component } from './component'

export interface BuildItem {
  id: number
  quantity: number
  price: string
  buildId: number
  componentId: number
  component?: Component
}
