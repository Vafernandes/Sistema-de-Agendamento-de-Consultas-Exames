import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Agendamento } from "./Agendamento";

@Entity('usuario')
class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    dataNascimento: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    contato: string;

    @Column()
    senha: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.usuario)
    agendamentos: Agendamento[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export { Usuario }