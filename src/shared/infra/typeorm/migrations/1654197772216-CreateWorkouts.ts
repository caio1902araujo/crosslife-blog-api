import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWorkouts1654197772216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'workouts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'videoUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cover',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'trainerId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'WeeklyWorkoutsTrainer',
            referencedTableName: 'trainer',
            referencedColumnNames: ['id'],
            columnNames: ['trainerId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('workouts');
  }
}
