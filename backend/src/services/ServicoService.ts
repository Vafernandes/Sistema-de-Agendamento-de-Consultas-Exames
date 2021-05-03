import { getRepository, Repository } from "typeorm";
import { Servicos } from "../entities/Servicos";

interface RequestDTO {
    tipo_servico: string;
    nome: string;
    preco: number;
}

class ServicoService {

    private servicoRepository: Repository<Servicos>

    constructor() {
        this.servicoRepository = getRepository(Servicos)
    }

    public async execute({ tipo_servico, nome, preco }: RequestDTO): Promise<Servicos> {

        const servico = this.servicoRepository.create({
            tipo_servico,
            nome,
            preco
        });

        await this.servicoRepository.save(servico);

        return servico;
    }

    public async listaTodosOsServicos(tipo_servico: string): Promise<Servicos[]> {
        const servicos = this.servicoRepository.find({
            tipo_servico
        });

        return servicos;
    }   

}

export { ServicoService }