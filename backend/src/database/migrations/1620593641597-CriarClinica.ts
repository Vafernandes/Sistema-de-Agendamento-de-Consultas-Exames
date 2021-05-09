import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CriarClinica1620593641597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clinicas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "enderecoLogradouro",
                        type: "varchar"
                    },
                    {
                        name: "enderecoNumero",
                        type: "varchar"
                    },
                    {
                        name: "enderecoComplemento",
                        type: "varchar"
                    },
                    {
                        name: "enderecoBairro",
                        type: "varchar"
                    },
                    {
                        name: "enderecoCep",
                        type: "varchar"
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
        );

        await queryRunner.addColumn("clinicas", new TableColumn({
            name: "id_servico",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("clinicas", new TableForeignKey({
            name: "ClinicaServico",
            columnNames: ["id_servico"],
            referencedColumnNames: ["id"],
            referencedTableName: "servicos",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("clinicas", "ClinicaServico");
        await queryRunner.dropColumn("clinicas", "id_servico");
        await queryRunner.dropTable("clinicas")
    }

}
