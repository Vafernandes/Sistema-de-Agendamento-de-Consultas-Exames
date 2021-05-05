import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CriarAgendamento1620180925753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'agendamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'id_servico',
                        type: 'uuid'
                    },
                    {
                        name: 'data',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'agendamentos',
            new TableForeignKey({
                name: 'AgendamentoServico',
                columnNames: ['id_servico'],
                referencedColumnNames: ['id'],
                referencedTableName: 'servicos',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('agendamentos', 'AgendamentoServico');
        
        await queryRunner.dropTable('agendamentos');
    }

}
