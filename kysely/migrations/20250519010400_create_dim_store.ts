import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('dim_store')
    .ifNotExists()
    .addColumn('store_key', 'serial', (col) => col.primaryKey()) // Surrogate key
    .addColumn('store_id', 'integer', (col) => col.notNull()) // Natural key from 'loja.id_loja'
    .addColumn('store_code', 'varchar(10)', (col) => col.notNull().unique()) // From 'loja.codigo_loja'
    .addColumn('store_name', 'varchar(50)', (col) => col.notNull()) // From 'loja.nome_loja'
    .addColumn('address', 'varchar(200)') // From 'loja.endereco'
    .addColumn('city', 'varchar(50)') // From 'loja.cidade'
    .addColumn('state', 'char(2)') // From 'loja.estado'
    .addColumn('zip_code', 'varchar(8)') // From 'loja.cep'
    .addColumn('phone', 'varchar(20)') // From 'loja.telefone'
    .addColumn('manager_name', 'varchar(100)') // From 'loja.gerente'
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .createIndex('idx_dim_store_id')
    .on('dim_store')
    .column('store_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .dropIndex('idx_dim_store_id')
    .ifExists()
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .dropTable('dim_store')
    .ifExists()
    .execute();
} 