import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueConstraintTitleNews1656601363738
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'news',
      new TableUnique({
        columnNames: ['title'],
        name: 'uniqueTitle',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('news', 'uniqueTitle');
  }
}
