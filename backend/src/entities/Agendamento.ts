import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Servicos } from "./Servicos";

@Entity('agendamentos')
class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    id_servico: string;

    @ManyToOne(() => Servicos)
    @JoinColumn({ name: 'id_servico' })
    agendamento: Agendamento;

    @Column()
    data: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Agendamento }