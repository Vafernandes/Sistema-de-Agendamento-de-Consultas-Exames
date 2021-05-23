import { Router } from 'express';
import { UsuarioService } from '../services/UsuarioService';

const usuarioRouter = Router();

usuarioRouter.post('/', async (request, response) => {
    try {
        const { 
            nome, 
            dataNascimento,
            cpf,
            email,
            contato,
            senha
        } = request.body;

        const usuarioService = new UsuarioService();

        const usuario = await usuarioService.execute({ 
            nome, 
            dataNascimento,
            cpf,
            email,
            contato,
            senha
         });

        return response.status(201).json(usuario);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

usuarioRouter.get('/meusagendamentos', async (request, response) => {
    try {

        const usuarioService = new UsuarioService();

        const agendamentos = await usuarioService.meusAgendamentos();

        return response.status(201).json(agendamentos)
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export { usuarioRouter }