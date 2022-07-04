import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccessCounter1656699174633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessCounter',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'count',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'newsId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'AccessCounterNews',
            referencedTableName: 'news',
            referencedColumnNames: ['id'],
            columnNames: ['newsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessCounter');
  }
}
