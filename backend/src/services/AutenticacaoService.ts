import { sign } from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario';

interface AutenticacaoRequestDTO {
    cpf: string,
    senha: string
}

interface ResponseAutenticacao {
    usuario: {
        id: string,
        nome: string;
        cpf: string;
        email: string;
    },
    token: string;
}

class AutenticacaoService {

    private usuarioRepository: Repository<Usuario>;

    constructor() {
        this.usuarioRepository = getRepository(Usuario);
    }

    public async execute({ cpf, senha }: AutenticacaoRequestDTO): Promise<ResponseAutenticacao> {

        const usuario = await this.usuarioRepository.findOne({
            where: { cpf }
        })

        if (!usuario) {
            throw new Error('Usuário ou senha incorretos!');
        }

        const senhaRequest = await this.usuarioRepository.findOne({
            where: { senha }
        })

        if (!senhaRequest) {
            throw new Error('Usuário ou senha incorretos!');
        }

        const token = sign({}, '314f23e749e2b451939828d80852e948', {
            subject: usuario.id,
            expiresIn: '1d'
        })

        const tokenReturn = {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                email: usuario.email
            }
        }

        return tokenReturn
    }
}

export { AutenticacaoService }