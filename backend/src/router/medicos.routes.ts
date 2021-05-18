import { Router } from 'express'
import { MedicoService } from '../services/MedicoService';

const medicosRouter = Router()

medicosRouter.post('/', async (request, response) => {
    try {
        const { nome, crm, datasHorasCadastradas, id_servico, id_clinica } = request.body;

        const medicoService = new MedicoService()

        const medico = await medicoService.execute({ 
            nome, 
            crm, 
            datasHorasCadastradas, 
            id_servico, 
            id_clinica
        })

        return response.status(201).json(medico)
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }

})

medicosRouter.get('/', async (request, response) => {
    try {
        
        const medicoService = new MedicoService();

        const medicos = await medicoService.listarTodosMedicos()

        return response.status(200).json(medicos)
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

medicosRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const medicoService = new MedicoService();

        const medico = await medicoService.buscaPorId(id);

        return response.status(200).json(medico);
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

medicosRouter.delete('/deletarMedico/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const medicoService = new MedicoService();

        await medicoService.deletarMedico(id);

        return response.status(200).json({message: 'Deletado com sucesso!'});
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

export { medicosRouter }