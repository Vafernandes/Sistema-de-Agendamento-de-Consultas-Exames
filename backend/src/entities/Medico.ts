import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clinica } from "./Clinica";
import { DataHora } from "./DataHora";
import { Servicos } from "./Servicos";

@Entity('medicos')
class Medico {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    crm: string;

    @Column()
    id_servico: string;

    @Column()
    id_clinica: string;

    @ManyToOne(() => Clinica, clinica => clinica.medicos)
    @JoinColumn({ name: 'id_clinica' })
    clinica: Clinica;

    @ManyToOne(() => Servicos, servico => servico.medicos)
    @JoinColumn({ name: 'id_servico' })
    servico: Servicos;

    @OneToMany(() => DataHora, dataHora => dataHora.medico)
    datasHorarios: DataHora[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Medico }