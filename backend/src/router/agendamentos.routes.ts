import { parseISO } from 'date-fns';
import { Router } from 'express';
import { AgendamentoService } from '../services/AgendamentoService';

const agendamentosRouter = Router();

agendamentosRouter.post('/', async (request, response) => {
    try {
        const { id_servico, data } = request.body;

        const agendamentoService = new AgendamentoService();

        const parsedDate = parseISO(data);

        const agendamento = await agendamentoService.execute({ id_servico, data: parsedDate });

        return response.status(201).json(agendamento);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

})

export { agendamentosRouter }