import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNews1654610197887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news',
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
            name: 'subtitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'cover',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'author_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'NewsAuthor',
            referencedTableName: 'authors',
            referencedColumnNames: ['id'],
            columnNames: ['author_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('news');
  }
}
