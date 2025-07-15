import express from 'express'
import { Request, Response } from 'express'
import { comparePassword, hashPassword } from '../utils/hash.utils'
import { generateToken } from '../utils/jwt.utils'
import { prisma } from '../../lib/prisma'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (user !== null) {
            res.status(400).json({ message: 'User exists' })
        }

        // users[email] = { password: await hashPassword(password) }
        res.status(201).json({ message: 'User created' })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (user === null || !(await comparePassword(password, user.password))) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = generateToken(email)
        res.status(200).json({ token, userId: user.id, isTwoFA: user.isTwoFA })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/user', async (req: Request, res: Response) => {
    try {
        const { email } = req.query

        if (typeof email !== 'string') {
            res.status(400).json({ message: 'Invalid email' })
            return
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        })

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
