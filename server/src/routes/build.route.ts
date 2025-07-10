import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { buildSchema } from '../../prisma/validation'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const { user_id } = req.query
    try {
        const builds = await prisma.build.findMany({
            where: user_id ? { user_id: String(user_id) } : {},
            include: {
                items: {
                    include: {
                        component: true,
                    },
                },
            },
        })
        res.json(builds)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, price, user_id, items } = buildSchema.parse(req.body)

        const newBuild = await prisma.build.create({
            data: {
                name,
                price,
                user_id,
                items: {
                    createMany: {
                        data: items || [],
                    },
                },
            },
            include: {
                items: true,
            },
        })

        res.status(201).json(newBuild)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const build = await prisma.build.findUnique({
            where: { id: Number(id) },
            include: {
                items: true,
            },
        })

        if (!build) {
            res.status(404).json({ error: 'Build not found' })
            return
        }

        res.json(build)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, price } = buildSchema.parse(req.body)

        const updatedBuild = await prisma.build.update({
            where: { id: Number(id) },
            data: {
                name,
                price,
            },
        })

        res.json(updatedBuild)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.build.delete({
            where: { id: Number(id) },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
