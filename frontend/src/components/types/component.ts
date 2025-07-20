export interface Component {
  id: number
  releaseDate?: Date
  imgUrl?: string
  specs: any
  ocProfiles: any
  name: string
  slug: string
  price: string
  typeId: number
  manufacturerId: number
  manufacturer?: {
    id: number
    name: string
  }
  disabled?: boolean
}
