import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DataHora } from "./DataHora";

@Entity('medicos')
class Medico {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    crm: string;

    @OneToMany(() => DataHora, dataHora => dataHora.medico)
    datasHorarios: DataHora;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Medico }