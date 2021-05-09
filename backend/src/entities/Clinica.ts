import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Endereco } from "./Endereco";
import { Servicos } from "./Servicos";

class Clinica {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column(type => Endereco)
    endereco: Endereco;

    @ManyToMany(() => Servicos)
    @JoinTable({ name: 'servicos' })
    servicos: Servicos[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Clinica }