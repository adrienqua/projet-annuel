// utils/jwt.ts
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export const generateToken = (email: string): string => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}
