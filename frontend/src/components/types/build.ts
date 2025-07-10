import type { BuildItem } from './buildItem'
import type { Component } from './component'

export interface Build {
  id: number
  name: string
  price: string
  userId: string
  createdAt: string
  items: Partial<BuildItem>[]
}
