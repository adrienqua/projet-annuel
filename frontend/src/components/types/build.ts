import type { BuildItem } from './buildItem'
import type { Component } from './component'

export interface Build {
  id: number
  name: string
  price: string
  user_id: string
  created_at: string
  items: BuildItem[]
}
