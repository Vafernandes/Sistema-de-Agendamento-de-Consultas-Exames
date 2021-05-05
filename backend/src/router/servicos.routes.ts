import { Router } from 'express'
import { ServicoService } from '../services/ServicoService';

const servicoRouter = Router();

servicoRouter.post('/', async (request, response) => {
    try {
        const { tipo_servico, nome, preco } = request.body;

        const servicoService = new ServicoService();

        const servico = await servicoService.execute({
            tipo_servico,
            nome,
            preco
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

export { servicoRouter }