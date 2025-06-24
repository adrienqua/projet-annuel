import { Request, Response } from 'express'
import { comparePassword, hashPassword } from '../utils/hash.utils'
import { generateToken } from '../utils/jwt.utils'
import { findUserByEmail } from '../services/user.service'

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = findUserByEmail(email)

    if (user !== null) {
        res.status(400).json({ message: 'User exists' })
    }

    // users[email] = { password: await hashPassword(password) }
    res.status(201).json({ message: 'User created' })
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await findUserByEmail(email)

    if (user === null || !(await comparePassword(password, user.password))) {
        res.status(401).json({ message: 'Invalid credentials' })
        return
    }

    const token = generateToken(email)
    res.status(200).json({ token })
}
