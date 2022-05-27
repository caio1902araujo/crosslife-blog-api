import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatephysicalEvaluation1652898565041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'physical_evaluation',
        columns:[
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'fat_mass',
            type: 'float'
          },
          {
            name: 'lean_mass',
            type: 'float',
          },
          {
            name: 'muscle_mass',
            type: 'float',
          },
          {
            name: 'bone_density',
            type: 'float',
          },
          {
            name: 'visceral_fat',
            type: 'float',
          },
          {
            name: 'basal_metabolism',
            type: 'float'
          },
          {
            name: 'hydration',
            type: 'float',
          },
          {
						name: 'student_id',
						type: 'uuid',
					},
        ],
        foreignKeys: [
					{
						name: 'PhysicalEvaluationStudent',
						referencedTableName: 'student',
						referencedColumnNames: ['id'],
						columnNames: ['student_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					}
				]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('physical_evaluation');
    }

}
