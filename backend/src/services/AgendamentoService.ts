import { startOfHour } from 'date-fns'
import { getRepository, Repository } from 'typeorm';
import { Agendamento } from '../entities/Agendamento';

interface RequestDTO {
    id_servico: string;
    data: Date;
}

class AgendamentoService {

    private agendamentoRepository: Repository<Agendamento>;

    constructor() {
        this.agendamentoRepository = getRepository(Agendamento);
    }

    public async execute({ id_servico, data }: RequestDTO): Promise<Agendamento> {

        const dataAgendamento = startOfHour(data);

        const existeAgendamentoNaMesmaData = await this.agendamentoRepository.findOne({
            where: { data: dataAgendamento }
        })

        if(existeAgendamentoNaMesmaData) {
            throw new Error('Agendamento já existente neste horário!');
        }

        const agendamento = this.agendamentoRepository.create({
            id_servico,
            data: dataAgendamento
        });

        await this.agendamentoRepository.save(agendamento);

        return agendamento;
    }
}

export { AgendamentoService }