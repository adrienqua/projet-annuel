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
=======
import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const { manufacturer_id } = req.query

        const components = await prisma.component.findMany({
            where: manufacturer_id ? { manufacturer_id: Number(manufacturer_id) } : {},
        })
        res.json(components)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, release_date, specs, oc_profiles, type_id, manufacturer_id } = req.body

        const component = await prisma.component.create({
            data: {
                name,
                release_date: release_date ? new Date(release_date) : undefined,
                specs,
                oc_profiles,
                type_id,
                manufacturer_id,
            },
        })

        res.status(201).json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const component = await prisma.component.findUnique({
            where: { id: Number(id) },
        })

        res.json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, release_date, specs, oc_profiles, type_id, manufacturer_id } = req.body

        const component = await prisma.component.update({
            where: { id: Number(id) },
            data: {
                name,
                release_date: release_date ? new Date(release_date) : undefined,
                specs,
                oc_profiles,
                type_id,
                manufacturer_id,
            },
        })

        res.json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.component.delete({
            where: { id: Number(id) },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
