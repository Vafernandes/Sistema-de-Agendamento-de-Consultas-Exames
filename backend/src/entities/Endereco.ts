import { Column } from "typeorm";

class Endereco {

    @Column()
    logradouro: string;

    @Column()
    numero: string;

    @Column()
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cep: string;
}

export { Endereco }