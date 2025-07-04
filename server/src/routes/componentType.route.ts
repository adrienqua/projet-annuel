import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const componentTypes = await prisma.componentType.findMany({
            include: {
                components: {
                    include: {
                        manufacturer: true,
                    },
                },
            },
        })
        res.json(componentTypes)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, slug, reference } = req.body

        const componentType = await prisma.componentType.create({
            data: { name, slug, reference },
        })

        res.status(201).json(componentType)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const componentType = await prisma.componentType.findUnique({
            where: { id: Number(id) },
            include: { components: true },
        })

        if (!componentType) {
            res.status(404).json({ error: 'ComponentType not found' })
            return
        }

        res.json(componentType)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const updated = await prisma.componentType.update({
            where: { id: Number(id) },
            data: { name },
        })

        res.json(updated)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.componentType.delete({
            where: { id: Number(id) },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
