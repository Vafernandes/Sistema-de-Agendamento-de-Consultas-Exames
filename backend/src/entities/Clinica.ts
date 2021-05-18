import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Endereco } from "./Endereco";
import { Medico } from "./Medico";

@Entity('clinicas')
class Clinica {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column(type => Endereco)
    endereco: Endereco;

    @OneToMany(() => Medico, medico => medico.clinica)
    medicos: Medico[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Clinica }