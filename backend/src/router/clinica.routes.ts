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

clinicaRouter.put('/adicionarServico/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { tipo_servico, nome, preco } = request.body;

        const clinicaService = new ClinicaService();

        const clinica = await clinicaService.adicionaServicoNaClinica({
            id,
            tipo_servico,
            nome,
            preco
        })

        return response.status(200).json(clinica); 
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

clinicaRouter.get('/', async (request, response) => {
    try {
        const clinicaService = new ClinicaService();
        const clinicas = await clinicaService.listarTodasClinicas();

        return response.status(200).json(clinicas); 
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

export { clinicaRouter }