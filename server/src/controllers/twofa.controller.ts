import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { generateToken } from '../utils/jwt.utils'

export const setup2FA = async (req: Request, res: Response) => {
    const { userId } = req.query

    if (typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing userId' })
    }

    const secret = speakeasy.generateSecret({ name: `ProjetAnnuel (${userId})` })

    if (!secret.otpauth_url) {
        return res.status(500).json({ message: "Impossible de générer l'URL OTP" })
    }

    await prisma.user.update({
        where: { id: userId },
        data: { twoFaSecret: secret.base32 },
    })

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url)

    res.json({ qrCodeDataUrl, secret: secret.base32 })
}


export const verify2FA = async (req: Request, res: Response) => {
    const { userId, token } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user?.twoFaSecret) {
        return res.status(400).json({ message: '2FA non configuré' })
    }

    const verified = speakeasy.totp.verify({
        secret: user.twoFaSecret,
        encoding: 'base32',
        token,
    })

    if (verified) {
        await prisma.user.update({
            where: { id: userId },
            data: { isTwoFA: true },
        })
    }

    if (!verified) {
        return res.status(401).json({ message: 'Code incorrect', verified: false })
    }

    await prisma.user.update({
        where: { id: userId },
        data: { isTwoFA: true },
    })

    res.status(200).json({ message: '2FA activé avec succès', verified: true })
}

export const verifyLogin2FA = async (req: Request, res: Response) => {
    const { userId, token } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user?.twoFaSecret) {
        return res.status(400).json({ message: '2FA non configuré' })
    }

    const verified = speakeasy.totp.verify({
        secret: user.twoFaSecret,
        encoding: 'base32',
        token,
        window: 2,})

    if (!verified) {
        return res.status(401).json({ message: 'Code incorrect', verified: false })
    }
    const tokenJwt = generateToken(user.email)

    return res.status(200).json({
        message: 'Connexion 2FA validée',
        token: tokenJwt,
        userId: user.id,
        verified: true,
    })
}
