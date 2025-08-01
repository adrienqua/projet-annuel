// src/services/compare.service.ts

import { prisma } from '../../lib/prisma'     // 1 seul import de prisma
import {
    computeCPUScore,
    computeGPUScore,
    computeRAMScore,
    computeStorageScore,
} from '../utils/scoring'

export async function compareComponentsById(id1: number, id2: number) {
    const [comp1, comp2] = await Promise.all([
        prisma.component.findUnique({ where: { id: id1 } }),
        prisma.component.findUnique({ where: { id: id2 } }),
    ])

    if (!comp1 || !comp2) {
        throw new Error('Un ou deux composants sont introuvables.')
    }

    if (comp1.typeId !== comp2.typeId) {
        return {
            result: 'Les composants sont de types différents, comparaison impossible.',
            score1: null,
            score2: null,
        }
    }

    const details1 = comp1.specs as any
    const details2 = comp2.specs as any

    let score1 = 0
    let score2 = 0

    switch (comp1.typeId) {
        case 1:
            score1 = computeCPUScore(details1)
            score2 = computeCPUScore(details2)
            break
        case 2:
            score1 = computeGPUScore(details1)
            score2 = computeGPUScore(details2)
            break
        case 3:
            score1 = computeRAMScore(details1)
            score2 = computeRAMScore(details2)
            break
        case 4:
            score1 = computeStorageScore(details1)
            score2 = computeStorageScore(details2)
            break
        default:
            return {
                result: `Type ID ${comp1.typeId} non pris en charge.`,
                score1: null,
                score2: null,
            }
    }

    let verdict = 'Les deux composants sont équivalents.'
    if (score1 > score2) verdict = `${comp1.name} est meilleur (score ${score1.toFixed(1)} vs ${score2.toFixed(1)}).`
    else if (score2 > score1) verdict = `${comp2.name} est meilleur (score ${score2.toFixed(1)} vs ${score1.toFixed(1)}).`

    return {
        result: verdict,
        score1: score1.toFixed(1),
        score2: score2.toFixed(1),
    }
}
