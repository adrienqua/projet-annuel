import express from 'express'
import { compareComponentsController } from '../controllers/compare.controller'

const router = express.Router()

router.post('/', compareComponentsController)

export default router
