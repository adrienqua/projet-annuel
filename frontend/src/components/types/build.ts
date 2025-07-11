import type { BuildItem } from './buildItem'

export interface Build {
  id: number
  name: string
  price: string
  userId: string
  createdAt: string
  items: Partial<BuildItem>[]
}


