import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const addresses = await prisma.address.findMany()
        res.json(addresses)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            label,
            name,
            phone,
            address,
            addressComplement,
            postalCode,
            city,
            country,
            userId,
        } = req.body

        const createAddress = await prisma.address.create({
            data: {
                label,
                name,
                phone,
                address,
                addressComplement,
                postalCode,
                city,
                country,
                userId,
            },
        })

        res.status(201).json(createAddress)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const address = await prisma.address.findUnique({
            where: { id: Number(id) },
        })

        if (!address) {
            res.status(404).json({ error: 'address not found' })
            return
        }

        res.json(address)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { label, name, phone, address, addressComplement, postalCode, city, country } =
            req.body

        const updated = await prisma.address.update({
            where: { id: Number(id) },
            data: {
                label,
                name,
                phone,
                address,
                addressComplement,
                postalCode,
                city,
                country,
            },
        })

        res.json(updated)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.address.delete({
            where: { id: Number(id) },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
