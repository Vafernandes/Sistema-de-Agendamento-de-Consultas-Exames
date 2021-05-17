import { Router } from 'express';
import { DataHoraService } from '../services/DataHoraService';

const dataHoraRouter = Router();

dataHoraRouter.post('/', async (request, response) => {
    try {
        const { data, hora } = request.body;

        const dataHoraService = new DataHoraService();

        const dataHora = await dataHoraService.execute({ data, hora });

        return response.status(201).json(dataHora);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export { dataHoraRouter }