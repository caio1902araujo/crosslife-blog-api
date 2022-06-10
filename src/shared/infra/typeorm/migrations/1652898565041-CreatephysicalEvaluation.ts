import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatephysicalEvaluation1652898565041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'physicalEvaluation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'fatMass',
            type: 'float',
          },
          {
            name: 'leanMass',
            type: 'float',
          },
          {
            name: 'muscleMass',
            type: 'float',
          },
          {
            name: 'boneDensity',
            type: 'float',
          },
          {
            name: 'visceralFat',
            type: 'float',
          },
          {
            name: 'basalMetabolism',
            type: 'float',
          },
          {
            name: 'hydration',
            type: 'float',
          },
          {
            name: 'studentId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'PhysicalEvaluationStudent',
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
    queryRunner.dropTable('physicalEvaluation');
  }
}
