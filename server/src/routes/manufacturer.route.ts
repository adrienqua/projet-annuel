import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const manufacturers = await prisma.manufacturer.findMany()
        res.json(manufacturers)
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        const manufacturer = await prisma.manufacturer.create({
            data: { name },
        })
        res.status(201).json(manufacturer)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.manufacturer.delete({
            where: { id: Number(id) },
        })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
