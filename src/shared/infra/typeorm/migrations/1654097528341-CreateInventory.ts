import {DriverOptionNotSetError, MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateInventory1654097528341 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'inventory',
      columns:[
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'product',
          type: 'varchar'
        },
        {
          name: 'quantity',
          type: 'int',
        },
        {
          name: 'note',
          type: 'varchar'
        },
      ]
    }));
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('inventory');
    }

}
