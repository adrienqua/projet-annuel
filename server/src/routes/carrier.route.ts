import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const carriers = await prisma.carrier.findMany()
        res.status(200).json(carriers)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

export default router
