import { Router } from 'express'
import { medicosRouter } from './medicosRouter'

const router = Router()

router.use('/medicos', medicosRouter)

export { router }