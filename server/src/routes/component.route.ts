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
