import { Router } from 'express';
import { ClinicaService } from '../services/ClinicaService';

const clinicaRouter = Router();

clinicaRouter.post('/', async (request, response) => {
    try {
        const {
            nome,
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        } = request.body;

        const clinicaService = new ClinicaService();

        const clinica = await clinicaService.execute({
            nome,
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        })

        return response.status(201).json(clinica);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

clinicaRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const clinicaService = new ClinicaService();
    
        const clinica = await clinicaService.buscaClinicaPorId(id);

        return response.status(200).json(clinica);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

clinicaRouter.get('/', async (request, response) => {
    try {
        const clinicaService = new ClinicaService();
        const clinicas = await clinicaService.listarTodasClinicas();

        return response.status(200).json(clinicas); 
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

clinicaRouter.delete('/deletarClinica/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const clinicaService = new ClinicaService();
        
        await clinicaService.deletarClinica(id);

        return response.status(200).json({ message: 'Deletado com sucesso!' });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

clinicaRouter.put('/atualizarClinica/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const {
            nome,
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        } = request.body;

        const clinicaService = new ClinicaService();

        const clinicaAtualizada = await clinicaService.atualizarClinica({
            id,
            nome,
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        })

        return response.status(200).json(clinicaAtualizada); 
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

clinicaRouter.get('/medicos/clinicas/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const clinicaService = new ClinicaService();
        
        const medicos = await clinicaService.listarMedicosPorClinica(id);

        return response.status(200).json(medicos)
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

export { clinicaRouter }