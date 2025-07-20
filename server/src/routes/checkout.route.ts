import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { buildSchema } from '../../prisma/validation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            userId,
            userEmail,
            address,
            carrierName,
            carrierPrice,
            products,
        }: {
            userId: string
            userEmail: string
            address: string
            carrierName: string
            carrierPrice: number
            products: number[]
        } = req.body || {}

        const productsUniqueIds = [...new Set(products)]

        const productsDetails = await prisma.component.findMany({
            where: { id: { in: productsUniqueIds } },
        })

        let line_items = []
        let order_items = []
        let subTotal = 0

        for (const product of productsDetails) {
            const quantity = products.filter((id: number) => id === product.id).length
            const price = Number(product.price) * 100

            subTotal += (price * quantity) / 100

            line_items.push({
                quantity: quantity,
                price_data: {
                    currency: 'EUR',
                    product_data: { name: product.name },
                    unit_amount: Number(price.toFixed(0)),
                },
            })
            order_items.push({
                quantity,
                price: product.price,
                product: product.name,
                componentId: product.id,
            })
        }

/*         let shipping
        if (subTotal >= 600) {
            shipping = 0
        } else {
            shipping = carrierPrice
        } */
        let shipping = carrierPrice
        
        const total = subTotal + shipping

        const order = await prisma.order
            .create({
                data: {
                    userId: userId,
                    address: address,
                    status: 'UNPAID',
                    carrierName: carrierName,
                    carrierPrice: shipping,
                    subTotal: subTotal,
                    total: total.toFixed(2),
                    orderItems: {
                        createMany: {
                            data: order_items,
                        },
                    },
                },
            })
            .then(async (res: any) => {
                const updatedOrder = await prisma.order.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        orderNumber: `A${res.id.toString().padStart(7, 0)}`,
                    },
                })

                return updatedOrder
            })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: subTotal >= 60 ? 0 : Math.round(carrierPrice * 100),
                            currency: 'EUR',
                        },
                        display_name: carrierName,
                    },
                },
            ],
            mode: 'payment',
            customer_email: userEmail,
            success_url: `${process.env.PUBLIC_URL}/checkout/success?orderId=${order.orderNumber}&sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.PUBLIC_URL}/checkout/canceled?orderId=${order.orderNumber}`,
            metadata: { orderId: order.orderNumber },
        })

        res.status(201).json({ url: session.url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.post('/success', async (req: Request, res: Response) => {
    const { orderId, sessionId } = req.body

    const retrievedSession = await stripe.checkout.sessions.retrieve(sessionId)
    console.log(retrievedSession)

    let order
    if (retrievedSession.payment_status === 'paid') {
        order = await prisma.order.update({
            where: {
                orderNumber: orderId,
            },
            data: {
                status: 'PAID',
            },
        })
    }

    if (order?.status === 'PAID') {
        return res.status(200).json({ orderStatus: 'PAID' })
    } else {
        return res.status(200).json({ orderStatus: order?.status })
    }
})

export default router
