import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Clinica } from "./Clinica";
import { Medico } from "./Medico";
import { Servicos } from "./Servicos";
import { Usuario } from "./Usuario";

@Entity('agendamentos')
class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    id_servico: string;

    @Column()
    id_medico: string;

    @Column()
    id_clinica: string;

    @Column()
    id_usuario: string;
    
    @Column()
    data: string;

    @Column()
    hora: string;

    @ManyToOne(() => Servicos)
    @JoinColumn({ name: 'id_servico' })
    servico: Servicos;

    @ManyToOne(() => Medico)
    @JoinColumn({ name: 'id_medico' })
    medico: Medico;

    @ManyToOne(() => Clinica)
    @JoinColumn({ name: 'id_clinica' })
    clinica: Clinica;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Agendamento }