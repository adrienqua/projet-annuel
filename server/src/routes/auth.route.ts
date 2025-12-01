import express from 'express'
import { Request, Response } from 'express'
import { comparePassword } from '../utils/hash.utils'
import { generateToken } from '../utils/jwt.utils'
import bcrypt from 'bcryptjs'
import { prisma } from '../../lib/prisma'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email et mot de passe sont requis',
            })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (user) {
            return res.status(400).json({ message: 'Email utilisé' })
        }

        const passwordValidation = validatePassword(password)
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: 'Mot de passe invalide',
                errors: passwordValidation.errors,
            })
        }

        const hashedPassword = await hashPassword(password)

        const role = 'USER'

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        })

        return res.status(201).json({ message: 'User created' })
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' })
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
        console.error('Error during login:', error)
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
                isTwoFA: true,
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

const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 8 caractères')
    }

    if (!/\d/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins 1 chiffre')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Le mot de passe doit contenir au moins 1 caractère spécial')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export default router
