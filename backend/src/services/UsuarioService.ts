import { getRepository, Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";

interface UsuarioRequestDTO {
    nome: string,
    dataNascimento: string,
    cpf: string,
    email: string,
    contato: string,
    senha: string
}

class UsuarioService {

    private usuarioRepository: Repository<Usuario>;

    constructor() {
        this.usuarioRepository = getRepository(Usuario);
    }

    public async execute({
        nome,
        dataNascimento,
        cpf,
        email,
        contato,
        senha
    }: UsuarioRequestDTO): Promise<Usuario> {

        const usuarioExiste = await this.usuarioRepository.findOne({
            where: { cpf }
        })

        if(usuarioExiste) {
            throw new Error('Usuário já possui cadastro');
        }

        const usuario = this.usuarioRepository.create({
            nome,
            dataNascimento,
            cpf,
            email,
            contato,
            senha
        })

        await this.usuarioRepository.save(usuario);

        return usuario;
    }

    public async meusAgendamentos() {
        const agendamentos = await this.usuarioRepository.find({
            relations: ['agendamentos']
        })

        return agendamentos
    }
}

export { UsuarioService }