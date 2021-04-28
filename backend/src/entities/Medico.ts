import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('medicos')
class Medico {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    crm: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Medico }