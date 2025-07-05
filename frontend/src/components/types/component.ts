export interface Component {
  id: number
  release_date?: Date
  img_url?: string
  specs: any
  oc_profiles: any
  name: string
  type_id: number
  manufacturer_id: number
  manufacturer?: {
    id: number
    name: string
  }
}
