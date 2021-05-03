import { getRepository } from "typeorm"
import { Medico } from "../entities/Medico"

interface RequestDTO {
    nome: string;
    crm: string;
}

class MedicoService {
    public async execute({ nome, crm }: RequestDTO): Promise<Medico> {

        const medicoRepository = getRepository(Medico);

        const medico = medicoRepository.create({ nome, crm });

        await medicoRepository.save(medico);

        return medico;
    }
}

export { MedicoService }