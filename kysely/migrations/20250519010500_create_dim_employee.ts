import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('dim_employee')
    .ifNotExists()
    .addColumn('employee_key', 'serial', (col) => col.primaryKey()) // Surrogate key
    .addColumn('employee_id', 'integer', (col) => col.notNull()) // Natural key from 'funcionario.id_funcionario'
    .addColumn('employee_code', 'varchar(10)', (col) => col.notNull().unique()) // From 'funcionario.codigo_funcionario'
    .addColumn('name', 'varchar(100)', (col) => col.notNull()) // From 'funcionario.nome'
    .addColumn('position', 'varchar(50)') // From 'funcionario.cargo'
    // 'id_loja' from 'funcionario' table can be used to link to DimStore if needed,
    // or directly store store_key if sales are strongly tied to employee's current store.
    // For simplicity, we'll keep it as is. SCD could be applied here too.
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .createIndex('idx_dim_employee_id')
    .on('dim_employee')
    .column('employee_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .dropIndex('idx_dim_employee_id')
    .ifExists()
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .dropTable('dim_employee')
    .ifExists()
    .execute();
} 