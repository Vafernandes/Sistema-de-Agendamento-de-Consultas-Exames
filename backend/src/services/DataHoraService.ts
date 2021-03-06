import { getRepository, Repository } from "typeorm"
import { DataHora } from "../entities/DataHora"

interface DataHoraRequestDTO {
    data: string;
    hora: string;
}

class DataHoraService {
    private dataHoraRepository: Repository<DataHora>

    constructor() {
        this.dataHoraRepository = getRepository(DataHora);
    }

    public async execute({ data, hora }: DataHoraRequestDTO): Promise<DataHora> {

        const dataHora = this.dataHoraRepository.create({
            data,
            hora
        });

        await this.dataHoraRepository.manager.save(dataHora);

        return dataHora;
    }
}

export { DataHoraService }