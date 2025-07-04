// src/services/compare.service.ts

import { prisma } from '../../lib/prisma'     // 1 seul import de prisma
import {
    computeCPUScore,
    computeGPUScore,
    computeRAMScore,
    computeStorageScore,
} from '../utils/scoring'

export async function compareComponentsById(id1: number, id2: number) {
    // Récupération des deux composants, en incluant leur type si besoin
    const [comp1, comp2] = await Promise.all([
        prisma.component.findUnique({ where: { id: id1 } }),
        prisma.component.findUnique({ where: { id: id2 } }),
    ])

    if (!comp1 || !comp2) {
        throw new Error('Un ou deux composants sont introuvables.')
    }

    // 1️⃣ Comparez les type_id au lieu de comp1.type
    if (comp1.type_id !== comp2.type_id) {
        return {
            result: '❌ Les composants sont de types différents, comparaison impossible.',
            score1: null,
            score2: null,
        }
    }

    // 2️⃣ On considère que vos specs JSON contiennent les détails
    const details1 = comp1.specs as any
    const details2 = comp2.specs as any

    let score1 = 0
    let score2 = 0

    switch (comp1.type_id) {
        case 1: // CPU
            score1 = computeCPUScore(details1)
            score2 = computeCPUScore(details2)
            break
        case 2: // GPU
            score1 = computeGPUScore(details1)
            score2 = computeGPUScore(details2)
            break
        case 3: // RAM
            score1 = computeRAMScore(details1)
            score2 = computeRAMScore(details2)
            break
        case 4: // STORAGE
            score1 = computeStorageScore(details1)
            score2 = computeStorageScore(details2)
            break
        default:
            return {
                result: `⚠️ Type ID ${comp1.type_id} non pris en charge.`,
                score1: null,
                score2: null,
            }
    }

    let verdict = '⚖️ Les deux composants sont équivalents.'
    if (score1 > score2) verdict = `✅ ${comp1.name} est meilleur (score ${score1.toFixed(1)} vs ${score2.toFixed(1)}).`
    else if (score2 > score1) verdict = `✅ ${comp2.name} est meilleur (score ${score2.toFixed(1)} vs ${score1.toFixed(1)}).`

    return {
        result: verdict,
        score1: score1.toFixed(1),
        score2: score2.toFixed(1),
    }
}
