import { getRepository, Repository } from "typeorm"
import { DataHora } from "../entities/DataHora";
import { Medico } from "../entities/Medico"
import { DataHoraService } from "./DataHoraService";

interface RequestDTO {
    nome: string;
    crm: string;
    datasHorasCadastradas: DataHora[];
    id_servico: string;
    id_clinica: string;
}

class MedicoService {

    private medicoRepository: Repository<Medico>

    constructor() {
        this.medicoRepository = getRepository(Medico);
    }

    public async execute({ 
        nome, 
        crm, 
        datasHorasCadastradas,
        id_servico,
        id_clinica
    }: RequestDTO): Promise<Medico> {

        const dataHoraService = new DataHoraService();
        const datasHorasObjCadastradosNoBanco: DataHora[] = [];

        for (const dataHora of datasHorasCadastradas) {
            const dataHoraObj = await dataHoraService.execute(dataHora);
            
            datasHorasObjCadastradosNoBanco.push(dataHoraObj);
        }

        const medico = this.medicoRepository.create({ 
            nome, 
            crm,
            datasHorarios: datasHorasObjCadastradosNoBanco,
            id_servico,
            id_clinica
        });

        await this.medicoRepository.manager.save(medico);

        return medico;
    }

    public async listarTodosMedicos(): Promise<Medico[]> {
        const medicos = await this.medicoRepository.find();

        return medicos;
    }

    public async buscaPorId(id:string): Promise<Medico> {
        const medico = await this.medicoRepository.findOne(id);

        if(!medico) {
            throw new Error('Medico não encontrado');
        }

        return medico;
    }

    public async deletarMedico(id: string): Promise<void> {
        await this.buscaPorId(id);

        await this.medicoRepository.delete(id);
    }

    public async listarDataHora(id: string) {
        const datasHoras = await this.medicoRepository.find({
            relations: ['datasHorarios']
        })

        let datasHorariosDeUmMedico: DataHora[] = [];
        for (const medico of datasHoras) {
            if(medico.id === id) {
                datasHorariosDeUmMedico = medico.datasHorarios
            }
        }

        return datasHorariosDeUmMedico;
    }
}

export { MedicoService }