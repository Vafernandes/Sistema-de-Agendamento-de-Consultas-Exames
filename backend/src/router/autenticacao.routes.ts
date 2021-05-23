import { Router } from 'express';
import { AutenticacaoService } from '../services/AutenticacaoService';

const autenticacaoRouter = Router();

autenticacaoRouter.post('/', async (request, response) => {
    try {
        const { cpf, senha } = request.body;

        const autenticacaoService = new AutenticacaoService();

        const usuarioLogado = await autenticacaoService.execute({ cpf, senha });

        return response.status(200).json(usuarioLogado);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }   
})

export { autenticacaoRouter }