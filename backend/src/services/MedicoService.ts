import { getRepository, Repository } from "typeorm"
import { DataHora } from "../entities/DataHora";
import { Medico } from "../entities/Medico"
import { DataHoraService } from "./DataHoraService";

interface RequestDTO {
    nome: string;
    crm: string;
    datasHorasCadastradas: DataHora[];
}

class MedicoService {

    private medicoRepository: Repository<Medico>

    constructor() {
        this.medicoRepository = getRepository(Medico);
    }

    public async execute({ nome, crm, datasHorasCadastradas }: RequestDTO): Promise<Medico> {

        const dataHoraService = new DataHoraService();
        const datasHorasObjCadastradosNoBanco: DataHora[] = [];

        for (const dataHora of datasHorasCadastradas) {
            const dataHoraObj = await dataHoraService.execute(dataHora);
            
            datasHorasObjCadastradosNoBanco.push(dataHoraObj);
        }

        const medico = this.medicoRepository.create({ 
            nome, 
            crm,
            datasHorarios: datasHorasObjCadastradosNoBanco 
        });

        await this.medicoRepository.manager.save(medico);

        return medico;
    }

    public async listarTodosMedicos(): Promise<Medico[]> {
        const medicos = await this.medicoRepository.find();

        return medicos;
    }
}

export { MedicoService }