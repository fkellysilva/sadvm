import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('dim_product')
    .ifNotExists()
    .addColumn('product_key', 'serial', (col) => col.primaryKey()) // Surrogate key
    .addColumn('product_id', 'integer', (col) => col.notNull()) // Natural key from source 'produto.id_produto'
    .addColumn('product_code', 'varchar(20)', (col) => col.notNull()) // From 'produto.codigo_produto'
    .addColumn('product_name', 'varchar(100)', (col) => col.notNull()) // From 'produto.nome_produto'
    .addColumn('product_description', 'text') // From 'produto.descricao'
    .addColumn('category_name', 'varchar(50)') // Denormalized from 'categoria.nome_categoria'
    .addColumn('brand', 'varchar(50)') // From 'produto.marca'
    .addColumn('unit_measure', 'varchar(20)') // From 'produto.unidade_medida'
    .addColumn('unit_price', sql`decimal(10,2)`) // Price for this version of the record
    .addColumn('valid_from_date', 'timestamp', (col) => col.notNull()) // SCD Type 2: Start date of this record version
    .addColumn('valid_to_date', 'timestamp') // SCD Type 2: End date of this record version (null for current)
    .addColumn('is_current_version', 'boolean', (col) => col.notNull().defaultTo(true)) // SCD Type 2: Flag for current version
    .execute();

  await db.schema
    .withSchema('data_warehouse')
    .createIndex('idx_dim_product_id_current')
    .on('dim_product')
    .columns(['product_id', 'is_current_version'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .dropIndex('idx_dim_product_id_current')
    .ifExists()
    .execute();
    
  await db.schema
    .withSchema('data_warehouse')
    .dropTable('dim_product')
    .ifExists()
    .execute();
} 