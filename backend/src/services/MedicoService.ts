import { getRepository } from "typeorm"
import { Medico } from "../entities/Medico"

interface RequestDTO {
    nome: string;
    crm: string;
    datas_atendimento: string;
    horarios_atendimento: string;
}

class MedicoService {
    public async execute({ nome, crm, datas_atendimento, horarios_atendimento }: RequestDTO): Promise<Medico> {

        const medicoRepository = getRepository(Medico);

        const medico = medicoRepository.create({ nome, crm, datas_atendimento, horarios_atendimento });

        await medicoRepository.save(medico);

        return medico;
    }
}

export { MedicoService }