import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('dim_customer')
    .ifNotExists()
    .addColumn('customer_key', 'serial', (col) => col.primaryKey()) // Surrogate key
    .addColumn('customer_id', 'integer', (col) => col.notNull()) // Natural key from 'cliente.id_cliente'
    .addColumn('cpf', 'varchar(11)', (col) => col.unique()) // From 'cliente.cpf', can be an NK
    .addColumn('name', 'varchar(100)', (col) => col.notNull()) // From 'cliente.nome'
    .addColumn('email', 'varchar(100)') // From 'cliente.email'
    .addColumn('phone', 'varchar(20)') // From 'cliente.telefone'
    .addColumn('address', 'varchar(200)') // From 'cliente.endereco'
    .addColumn('city', 'varchar(50)') // From 'cliente.cidade'
    .addColumn('state', 'char(2)') // From 'cliente.estado'
    .addColumn('zip_code', 'varchar(8)') // From 'cliente.cep'
    // We might add SCD Type 1 or Type 2 fields here if customer attributes change often
    // For now, keeping it simple (Type 1 - overwrite or Type 0 - retain original)
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .createIndex('idx_dim_customer_id')
    .on('dim_customer')
    .column('customer_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .dropIndex('idx_dim_customer_id')
    .ifExists()
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .dropTable('dim_customer')
    .ifExists()
    .execute();
} 