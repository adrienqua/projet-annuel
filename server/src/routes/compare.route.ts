import express from 'express'
import { compareComponentsController } from '../controllers/compare.controller'

const router = express.Router()

// NOTE : TypeScript sait maintenant que compareComponentsController est un RequestHandler
router.post('/', compareComponentsController)

export default router
