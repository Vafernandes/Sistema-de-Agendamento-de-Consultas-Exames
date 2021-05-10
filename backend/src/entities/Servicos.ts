import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Endereco } from "./Endereco";

@Entity('servicos')
class Servicos {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tipo_servico: string;

    @Column()
    nome: string;

    @Column()
    preco: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Servicos }