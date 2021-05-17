import { Router } from 'express'
import { ServicoService } from '../services/ServicoService';

const servicoRouter = Router();

servicoRouter.post('/', async (request, response) => {
    try {
        const {
            tipo_servico,
            nome,
            preco,
            clinicas
        } = request.body;

        const servicoService = new ServicoService();

        const servico = await servicoService.execute({
            tipo_servico,
            nome,
            preco,
            clinicas
        });

        return response.status(201).json(servico);
    } catch (error) {

        return response.status(400).json({ error: error.message });
    }
})

servicoRouter.get('/:tipo_servico', async (request, response) => {
    try {
        const { tipo_servico } = request.params;

        const servicoService = new ServicoService();

        const servicos = await servicoService.listaServicos(tipo_servico);

        return response.status(200).json(servicos)

    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

servicoRouter.get('/', async (request, response) => {
    try {
        const servicoService = new ServicoService();

        const servicos = await servicoService.listaTodosOsServicos();

        return response.status(200).json(servicos);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

servicoRouter.get('/buscaId/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const servicoService = new ServicoService();

        const servico = await servicoService.listaServicoPorId(id);

        return response.status(200).json(servico);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

servicoRouter.delete('/deletarServico/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const servicoService = new ServicoService();

        await servicoService.deletarServico(id);

        return response.status(200).json({ message: 'Deletado com sucesso!' })
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

servicoRouter.get('/listar/clinicasServico/:id', async (request, response) => {
    try {
        const {id} = request.params
        const servicoService = new ServicoService();

        const clinicasServico = await servicoService.listarClinicasDosServicos(id)

        return response.status(200).json(clinicasServico) 
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
})

export { servicoRouter }