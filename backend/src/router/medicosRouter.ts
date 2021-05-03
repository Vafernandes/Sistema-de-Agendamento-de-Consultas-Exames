import { Router } from 'express'
import { MedicoService } from '../services/MedicoService';

const medicosRouter = Router()

medicosRouter.post('/', async (request, response) => {
    try {
        const { nome, crm } = request.body;

        const medicoService = new MedicoService()

        const medico = await medicoService.execute({ nome, crm })

        return response.status(201).json(medico)
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }

})

export { medicosRouter }