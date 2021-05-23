import { getRepository, Repository } from 'typeorm';
import { Agendamento } from '../entities/Agendamento';

interface RequestDTO {
    id_servico: string,
    data: string,
    id_medico: string,
    id_clinica: string,
    hora: string,
    id_usuario: string
}

class AgendamentoService {

    private agendamentoRepository: Repository<Agendamento>;

    constructor() {
        this.agendamentoRepository = getRepository(Agendamento);
    }

    public async execute({
        id_servico,
        data,
        id_medico,
        id_clinica,
        hora,
        id_usuario
    }: RequestDTO): Promise<Agendamento> {

        const existeAgendamentoNoMesmoHorario = await this.agendamentoRepository.findOne({
            hora
        })

        if (existeAgendamentoNoMesmoHorario) {
            throw new Error('Agendamento já existente neste horário!');
        }

        const agendamento = this.agendamentoRepository.create({
            id_servico,
            data,
            id_medico,
            id_clinica,
            hora,
            id_usuario
        });

        await this.agendamentoRepository.save(agendamento);

        return agendamento;
    }
}

export { AgendamentoService }