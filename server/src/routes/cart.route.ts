import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const cartItems = req.query.cartItems ? JSON.parse(`[${req.query.cartItems}]` as string) : null
    console.log('cartItems', cartItems)
    try {
        const components = await prisma.component.findMany({
            where: {
                id: {
                    in: cartItems || [],
                },
            },
        })
        res.status(200).json(components)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

export default router
