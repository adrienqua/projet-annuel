import type { Component } from './component'

export interface ComponentType {
  id: number
  name: string
  components?: Component[]
}
