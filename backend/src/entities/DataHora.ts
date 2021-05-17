import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medico } from "./Medico";

class DataHora {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    data: Date;

    @Column()
    hora: string;

    @ManyToOne(() => Medico, medico => medico.datasHorarios)
    medico: Medico;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { DataHora }