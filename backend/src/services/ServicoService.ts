import { getRepository, Repository } from "typeorm";
import { Endereco } from "../entities/Endereco";
import { Servicos } from "../entities/Servicos";

interface RequestDTO {
    tipo_servico: string;
    nome: string;
    preco: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
}

class ServicoService {

    private servicoRepository: Repository<Servicos>

    constructor() {
        this.servicoRepository = getRepository(Servicos)
    }

    public async execute({
        tipo_servico,
        nome,
        preco,
        logradouro,
        numero,
        complemento,
        bairro,
        cep
    }: RequestDTO): Promise<Servicos> {

        const endereco = new Endereco()

        const objEndereco = Object.assign(endereco, {
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        })

        const servico = this.servicoRepository.create({
            tipo_servico,
            nome,
            preco,
            endereco: objEndereco
        });

        await this.servicoRepository.save(servico);

        return servico;
    }

    public async listaServicos(tipo_servico: string): Promise<Servicos[]> {
        const servicos = this.servicoRepository.find({
            tipo_servico
        });

        return servicos;
    }

    public async listaTodosOsServicos(): Promise<Servicos[]> {
        const servicos = this.servicoRepository.find();

        return servicos;
    }

    public async listaServicoPorId(id: string): Promise<Servicos> {
        const servicoExistente = await this.servicoRepository.findOne({
            id
        })

        if (!servicoExistente) {
            throw new Error('Serviço não encontrado!');
        }

        return servicoExistente
    }

    public async deletarServico(id: string): Promise<void> {

        await this.listaServicoPorId(id);

        await this.servicoRepository.delete(id);
    }

}

export { ServicoService }