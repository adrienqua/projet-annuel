import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.utils'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })

    const token = authHeader.split(' ')[1]
    try {
        const decoded = verifyToken(token)
        ;(req as any).user = decoded
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}
