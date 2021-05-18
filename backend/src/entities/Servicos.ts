import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clinica } from "./Clinica";
import { Medico } from "./Medico";

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

    @OneToMany(() => Medico, medico => medico.servico)
    medicos: Medico[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Servicos }