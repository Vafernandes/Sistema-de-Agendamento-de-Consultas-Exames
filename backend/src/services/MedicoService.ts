import { getRepository, Repository } from "typeorm"
import { Medico } from "../entities/Medico"

interface RequestDTO {
    nome: string;
    crm: string;
    datas_atendimento: string;
    horarios_atendimento: string;
}

class MedicoService {

    private medicoRepository: Repository<Medico>

    constructor() {
        this.medicoRepository = getRepository(Medico);
    }

    public async execute({ nome, crm, datas_atendimento, horarios_atendimento }: RequestDTO): Promise<Medico> {

        const medico = this.medicoRepository.create({ nome, crm, datas_atendimento, horarios_atendimento });

        await this.medicoRepository.save(medico);

        return medico;
    }

    public async listarTodosMedicos(): Promise<Medico[]> {
        const medicos = await this.medicoRepository.find();

        return medicos;
    }
}

export { MedicoService }