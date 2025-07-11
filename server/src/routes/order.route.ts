import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { orderSchema } from '../../prisma/validation'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const { userId } = req.query
    try {
        const orders = await prisma.order.findMany({
            where: userId ? { userId: String(userId) } : {},
            include: {
                orderItems: true,
            },
        })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            status,
            orderNumber,
            userId,
            address,
            carrierName,
            carrierPrice,
            subTotal,
            total,
            orderItems,
        } = orderSchema.parse(req.body)

        const newOrder = await prisma.order.create({
            data: {
                status,
                orderNumber,
                userId,
                address,
                carrierName,
                carrierPrice,
                subTotal,
                total,
                orderItems: {
                    createMany: {
                        data: orderItems || [],
                    },
                },
            },
            include: {
                orderItems: true,
            },
        })

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const order = await prisma.order.findUnique({
            where: { id: id },
            include: {
                orderItems: true,
            },
        })

        if (!order) {
            res.status(404).json({ error: 'Order not found' })
            return
        }

        res.json(order)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const {
            status,
            orderNumber,
            userId,
            address,
            carrierName,
            carrierPrice,
            subTotal,
            total,
            orderItems,
        } = orderSchema.parse(req.body)

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status,
                orderNumber,
                userId,
                address,
                carrierName,
                carrierPrice,
                subTotal,
                total,
                orderItems: {
                    deleteMany: {},
                    createMany: {
                        data: orderItems,
                    },
                },
            },
            include: {
                orderItems: true,
            },
        })

        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.order.delete({
            where: { id: id },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
