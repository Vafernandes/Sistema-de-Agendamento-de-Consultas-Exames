import { getRepository, Repository } from "typeorm";
import { Clinica } from "../entities/Clinica";
import { Endereco } from "../entities/Endereco";

interface PostClinicaRequestDTO {
    nome: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
}

interface AtualizarClinicaRequestDTO {
    id: string;
    nome: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
}

class ClinicaService {

    private clinicaRepository: Repository<Clinica>

    constructor() {
        this.clinicaRepository = getRepository(Clinica);
    }

    public async execute({
        nome,
        logradouro,
        numero,
        complemento,
        bairro,
        cep
    }: PostClinicaRequestDTO): Promise<Clinica> {

        const endereco = new Endereco()

        const objEndereco = Object.assign(endereco, {
            logradouro,
            numero,
            complemento,
            bairro,
            cep
        })

        const clinica = this.clinicaRepository.create({
            nome,
            endereco: objEndereco
        });

        await this.clinicaRepository.save(clinica);

        return clinica;
    }


    public async buscaClinicaPorId(id: string): Promise<Clinica> {
        const clinicaExiste = await this.clinicaRepository.findOne({
            id
        })

        if (!clinicaExiste) {
            throw new Error('Clinica não encontrado!');
        }

        return clinicaExiste
    }

    public async listarTodasClinicas(): Promise<Clinica[]> {
        const clinicas = await this.clinicaRepository.find();

        return clinicas;
    }

    public async deletarClinica(id: string) {
        await this.buscaClinicaPorId(id);

        await this.clinicaRepository.delete(id);
    }

    public async atualizarClinica({
        id,
        nome,
        logradouro,
        numero,
        complemento,
        bairro,
        cep
    }: AtualizarClinicaRequestDTO): Promise<Clinica> {
        const clinicaExiste = await this.buscaClinicaPorId(id);

        Object.assign(clinicaExiste, {
            nome,
            endereco: {
                logradouro,
                numero,
                complemento,
                bairro,
                cep
            }
        })

        await this.clinicaRepository.save(clinicaExiste)

        return clinicaExiste;
    }

}

export { ClinicaService }