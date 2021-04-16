import { Router } from 'express'
import { serviceRouter } from './serviceRouter'

const router = Router()

router.use('/service', serviceRouter)

export { router }