import express, { Request, Response } from 'express'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { generateToken } from '../utils/jwt.utils'
import { prisma } from '../../lib/prisma'
import { verifyLogin2FA } from '../controllers/twofa.controller'

const router = express.Router()

router.post('/verify-login', verifyLogin2FA)

router.get('/setup', async (req: Request, res: Response) => {
    const { userId } = req.query

    if (typeof userId !== 'string' || userId.length < 10) {
        return res.status(400).json({ message: 'Invalid or missing userId' })
    }
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return res.status(404).json({ message: 'User not found' })

        let secretBase32 = user.twoFaSecret
        if (!secretBase32) {
            const secret = speakeasy.generateSecret({ name: `ProjetAnnuel (${user.email})` })
            secretBase32 = secret.base32

            await prisma.user.update({
                where: { id: userId },
                data: {
                    twoFaSecret: secretBase32,
                    isTwoFA: false,
                },
            })
        }
        const otpauth_url = speakeasy.otpauthURL({
            secret: secretBase32,
            label: `ProjetAnnuel (${user.email})`,
            encoding: 'base32',
        })
        const qrCodeDataUrl = await QRCode.toDataURL(otpauth_url)
        return res.status(200).json({
            qrCodeDataUrl,
            secret: secretBase32,
        })
    } catch (err) {
        console.error('Erreur backend 2FA:', err)
        return res.status(500).json({ message: 'Erreur interne' })
    }
})
router.post('/verify', async (req: Request, res: Response) => {
    const { userId, token } = req.body

    if (!userId || !token) {
        return res.status(400).json({ message: 'Missing userId or token' })
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user || !user.twoFaSecret) {
            return res.status(404).json({ message: 'User or secret not found' })
        }

        const isVerified = speakeasy.totp.verify({
            secret: user.twoFaSecret,
            encoding: 'base32',
            token,
            window: 2,
        })

        if (!isVerified) {
            return res.status(401).json({ message: 'Invalid code' })
        }
        if (!user.isTwoFA) {
            await prisma.user.update({
                where: { id: userId },
                data: { isTwoFA: true },
            })
        }

        return res.status(200).json({ message: '2FA verified successfully' })
    } catch (err) {
        console.error('Erreur lors de la vérification du 2FA :', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
router.post('/reset', async (req: Request, res: Response) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' })
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                twoFaSecret: null,
                isTwoFA: false,
            },
        })

        return res.status(200).json({ message: '2FA reset successful' })
    } catch (err) {
        console.error('Erreur reset 2FA:', err)
        return res.status(500).json({ message: 'Erreur interne' })
    }
})


export default router
