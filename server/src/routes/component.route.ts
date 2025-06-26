import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        res.status(400).json({ message: 'ID invalide' })
        return
    }

    try {
        const component = await prisma.component.findUnique({
            where: { id },
            include: {
                type: true,
                manufacturer: true,
                vendorComponents: {
                    include: {
                        vendor: true,
                        priceHistory: true,
                    },
                },
            },
        })

        if (!component) {
            res.status(404).json({ message: 'Composant introuvable' })
            return
        }

        res.status(200).json(component)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

router.get('/', async (_req, res) => {
    try {
        const components = await prisma.component.findMany({
            select: {
                id: true,
                name: true,
            },
        })
        res.status(200).json(components)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

export default router
