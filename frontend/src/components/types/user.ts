export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string
  createdAt: Date
  name: string
  email: string
  role: Role
}
