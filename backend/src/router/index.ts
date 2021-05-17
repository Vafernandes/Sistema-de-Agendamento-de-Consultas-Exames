import { Router } from 'express'
import { agendamentosRouter } from './agendamentos.routes';
import { clinicaRouter } from './clinica.routes';
import { dataHoraRouter } from './dataHora.routes';
import { medicosRouter } from './medicos.routes'
import { servicoRouter } from './servicos.routes'

const router = Router();

router.use('/medicos', medicosRouter);
router.use('/servicos', servicoRouter);
router.use('/agendamentos', agendamentosRouter);
router.use('/clinicas', clinicaRouter);
router.use('/dataHora', dataHoraRouter);

export { router }