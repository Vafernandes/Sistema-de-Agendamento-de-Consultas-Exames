import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medico } from "./Medico";

@Entity('datas_horas')
class DataHora {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    data: string;

    @Column()
    hora: string;

    @ManyToOne(() => Medico, medico => medico.datasHorarios, {
        onDelete: 'CASCADE'
    })
    medico: Medico;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { DataHora }