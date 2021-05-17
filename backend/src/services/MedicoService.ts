import { getRepository, Repository } from "typeorm"
import { DataHora } from "../entities/DataHora";
import { Medico } from "../entities/Medico"

interface RequestDTO {
    nome: string;
    crm: string;
    datasHorasAtendimento: DataHora[];
}

class MedicoService {

    private medicoRepository: Repository<Medico>

    constructor() {
        this.medicoRepository = getRepository(Medico);
    }

    public async execute({ nome, crm, datasHorasAtendimento }: RequestDTO): Promise<Medico> {

        const medico = this.medicoRepository.create({ nome, crm });

        await this.medicoRepository.save(medico);

        return medico;
    }

    public async listarTodosMedicos(): Promise<Medico[]> {
        const medicos = await this.medicoRepository.find();

        return medicos;
    }
}

export { MedicoService }