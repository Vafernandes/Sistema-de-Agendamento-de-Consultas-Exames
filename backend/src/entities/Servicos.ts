import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ nullable: true })
    id_clinica: string;

    @ManyToOne(() => Clinica, clinica => clinica.servicos)
    @JoinColumn({ name: 'id_clinica' })
    clinica: Clinica;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Servicos }