import { Router } from 'express'
import { medicosRouter } from './medicosRouter'
import { servicoRouter } from './servicosRouter'

const router = Router();

router.use('/medicos', medicosRouter);
router.use('/servicos', servicoRouter);

export { router }