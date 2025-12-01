import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { userSchema } from '../../prisma/validation'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = userSchema.parse(req.body)

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role, isTwoFA: false },
        })
        res.status(201).json(user)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: { id },
        })
        res.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password, role, isTwoFA = false } = req.body

        const dataToUpdate: any = { name, email, role, isTwoFA }

        if (password && password.trim() !== '') {
            dataToUpdate.password = await bcrypt.hash(password, 12)
        }

        const user = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.user.delete({
            where: { id },
        })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id/addresses', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await prisma.address.findMany({
            where: { userId: id },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id/orders', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const orders = await prisma.order.findMany({
            where: id ? { userId: String(id) } : {},
            include: {
                orderItems: {
                    include: {
                        component: true,
                    },
                },
            },
        })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
