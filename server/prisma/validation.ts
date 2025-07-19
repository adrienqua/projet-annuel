import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(2, 'Le nom est obligatoire'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
    isTwoFA: z.boolean().optional().default(false),
})

export const buildItemSchema = z.object({
    quantity: z.number().int().min(1, 'La quantité doit être au moins 1'),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide'),
    componentId: z.number().int().positive('ID du composant invalide'),
})

export const buildSchema = z.object({
    name: z.string().min(2, 'Le nom est obligatoire'),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide'),
    userId: z.string().min(1, 'Le client est obligatoire'),
    items: z.array(buildItemSchema).optional(),
})

export const orderItemSchema = z.object({
    product: z.string().min(1, 'Nom du produit requis'),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide'),
    quantity: z.number().int().min(1, 'Quantité invalide'),
})

export const orderSchema = z.object({
    status: z.string().min(1, 'Le statut est requis'),
    orderNumber: z.string().optional(),
    userId: z.string().uuid('Id utilisateur invalide'),
    address: z.string().min(5, 'Adresse requise'),
    carrierName: z.string().min(1, 'Nom du transporteur requis'),
    carrierPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide'),
    subTotal: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Sous total invalide'),
    total: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Total invalide'),
    orderItems: z.array(orderItemSchema).min(1, 'Au moins un article est requis'),
})
