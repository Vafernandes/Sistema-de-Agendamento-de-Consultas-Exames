import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @OneToMany(() => Servicos, servico => servico.clinica)
    servicos: Servicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Clinica }