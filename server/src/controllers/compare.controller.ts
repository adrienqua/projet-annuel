// src/controllers/compare.controller.ts
import { Request, Response, NextFunction } from 'express'
import { compareComponentsById } from '../services/compare.service'

export async function compareComponentsController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id1, id2 } = req.body
    if (!id1 || !id2 || isNaN(id1) || isNaN(id2)) {
         res.status(400).json({ error: 'Deux identifiants valides sont requis.' })
    }

    try {
        const result = await compareComponentsById(Number(id1), Number(id2))
        res.json(result)
    } catch (err: any) {
        next(err)
    }
}
