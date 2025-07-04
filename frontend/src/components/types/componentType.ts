import type { Component } from './component'

export interface ComponentType {
  id: number
  name: string
  slug: string
  reference: string
  components?: Component[]
}
