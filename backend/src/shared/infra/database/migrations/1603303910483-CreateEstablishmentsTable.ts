import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEstablishmentsTable1603303910483
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'establishments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '20',
            default: null,
            isNullable: true,
          },
          {
            name: 'company_name',
            type: 'varchar',
            length: '100',
            default: null,
            isNullable: true,
          },
          {
            name: 'trade_name',
            type: 'varchar',
            length: '100',
            default: null,
            isNullable: true,
          },
          {
            name: 'address_street',
            type: 'varchar',
            length: '100',
            default: null,
            isNullable: true,
          },
          {
            name: 'address_number',
            type: 'varchar',
            length: '6',
            default: null,
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '70',
            default: null,
            isNullable: true,
          },
          {
            name: 'neighboorhood',
            type: 'varchar',
            length: '70',
            default: null,
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '70',
            default: null,
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '2',
            default: null,
            isNullable: true,
          },
          {
            name: 'zip_code',
            type: 'varchar',
            length: '12',
            default: null,
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '25',
            default: null,
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            default: null,
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: null,
            isNullable: true,
          },
          {
            name: 'owner_user_id',
            type: 'integer',
            default: null,
            isNullable: true,
          },
          {
            name: 'lat',
            type: 'float8',
            default: null,
            isNullable: true,
          },
          {
            name: 'long',
            type: 'float8',
            default: null,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'establishments',
      new TableForeignKey({
        columnNames: ['owner_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('establishments');
  }
}
