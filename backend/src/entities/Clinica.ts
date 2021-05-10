import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Endereco } from "./Endereco";
import { Servicos } from "./Servicos";

@Entity('clinicas')
class Clinica {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column(type => Endereco)
    endereco: Endereco;

    @ManyToMany(() => Servicos)
    @JoinTable({ name: 'clinicas_servicos' })
    servicos: Servicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Clinica }