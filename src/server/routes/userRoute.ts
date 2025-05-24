import { Router } from 'express'
import { prisma } from '../../../lib/prisma'
import { userSchema } from '../../../prisma/validation'
const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, password, role } = userSchema.parse(req.body)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = userSchema.parse(req.body)

        const user = await prisma.user.findUnique({
            where: { id },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, role } = userSchema.parse(req.body)

        const user = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                password,
                role,
            },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
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

export default router
