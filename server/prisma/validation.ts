import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(2, 'Le nom est obligatoire'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
})

export const buildItemSchema = z.object({
    quantity: z.number().int().min(1, 'La quantité doit être au moins 1'),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide (max 2 décimales)'),
    componentId: z.number().int().positive('ID du composant invalide'),
})

export const buildSchema = z.object({
    name: z.string().min(2, 'Le nom est obligatoire'),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide (max 2 décimales)'),
    userId: z.string().min(1, 'Le client est obligatoire'),
    items: z.array(buildItemSchema).optional(),
})
