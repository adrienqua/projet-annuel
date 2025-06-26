export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserType {
  id: string
  created_at: Date
  name: string
  email: string
  role: Role
}
