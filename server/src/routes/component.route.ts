import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        res.status(400).json({ message: 'ID invalide' })
        return
    }

    try {
        const component = await prisma.component.findUnique({
            where: { id },
            include: {
                type: true,
                manufacturer: true,
                vendorComponents: {
                    include: {
                        vendor: true,
                        priceHistory: true,
                    },
                },
            },
        })

        if (!component) {
            res.status(404).json({ message: 'Composant introuvable' })
            return
        }

        res.status(200).json(component)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

router.get('/slug/:slug', async (req: Request, res: Response) => {
    const slug = req.params.slug

    try {
        const component = await prisma.component.findUnique({
            where: { slug },
            include: {
                type: true,
                manufacturer: true,
                vendorComponents: {
                    include: {
                        vendor: true,
                        priceHistory: true,
                    },
                },
            },
        })

        if (!component) {
            res.status(404).json({ message: 'Composant introuvable' })
            return
        }

        res.status(200).json(component)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const components = await prisma.component.findMany({
            include: {
                type: true,
                manufacturer: true,
            }
        })
        res.status(200).json(components)
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message })
    }
})

/* router.get('/', async (req: Request, res: Response) => {
    try {
        const { manufacturerId } = req.query

        const components = await prisma.component.findMany({
            where: manufacturerId ? { manufacturerId: Number(manufacturerId) } : {},
        })
        res.json(components)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const component = await prisma.component.findUnique({
            where: { id: Number(id) },
        })

        res.json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
}) */

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, slug, price, releaseDate, specs, ocProfiles, typeId, manufacturerId } =
            req.body

        const component = await prisma.component.create({
            data: {
                name,
                slug,
                price,
                releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                specs,
                ocProfiles,
                typeId: typeof typeId === 'object' ? typeId.value : typeId,
                manufacturerId: typeof manufacturerId === 'object' ? manufacturerId.value : manufacturerId,
            },
        })

        res.status(201).json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, slug, price, releaseDate, specs, ocProfiles, typeId, manufacturerId } =
            req.body

        const component = await prisma.component.update({
            where: { id: Number(id) },
            data: {
                name,
                slug,
                price,
                releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                specs,
                ocProfiles,
                typeId,
                manufacturerId,
            },
        })

        res.json(component)
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.component.delete({
            where: { id: Number(id) },
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router
