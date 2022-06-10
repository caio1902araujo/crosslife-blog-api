import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatriculation1653686833455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'matriculation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'finishedAt',
            type: 'timestamp',
          },
          {
            name: 'studentId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'MatriculationStudent',
            referencedTableName: 'student',
            referencedColumnNames: ['id'],
            columnNames: ['studentId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matriculation');
  }
}
