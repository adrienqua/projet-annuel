import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { userSchema } from '../../prisma/validation'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ error })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = userSchema.parse(req.body)

        const user = await prisma.user.create({
            data: { name, email, password, role },
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: { id },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params

        const user = await prisma.user.findUnique({
            where: { email },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password, role } = userSchema.parse(req.body)

        const user = await prisma.user.update({
            where: { id },
            data: { name, email, password, role },
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.user.delete({
            where: { id },
        })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
}
