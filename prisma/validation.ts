import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(2, 'Le nom est obligatoire'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
})
