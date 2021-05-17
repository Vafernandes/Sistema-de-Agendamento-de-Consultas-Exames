import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clinica } from "./Clinica";

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

    @ManyToMany(() => Clinica)
    @JoinTable({ name: 'servicos_clinicas' })
    clinicas: Clinica[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Servicos }