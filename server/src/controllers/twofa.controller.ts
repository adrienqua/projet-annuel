import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export const setup2FA = async (req: Request, res: Response) => {
    const { userId } = req.body

    const secret = speakeasy.generateSecret({ name: `projetAnnuel (${userId})` })

    // Vérification de sécurité
    if (!secret.otpauth_url) {
        return res.status(500).json({ message: "Impossible de générer l'URL OTP" })
    }

    await prisma.user.update({
        where: { id: userId },
        data: { twoFaSecret: secret.base32 },
    })

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url)

    res.json({ qrCodeDataUrl })
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
            data: { asTwoFA: true },
        })
    }

    res.json({ verified })
}
