import { getRepository, Repository } from "typeorm";
import { Clinica } from "../entities/Clinica";
import { Endereco } from "../entities/Endereco";

interface RequestDTO {
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
    }: RequestDTO): Promise<Clinica> {

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

}

export { ClinicaService }