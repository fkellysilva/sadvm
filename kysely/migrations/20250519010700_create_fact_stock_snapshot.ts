import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('fact_stock_snapshot')
    .ifNotExists()
    .addColumn('stock_snapshot_key', 'serial', (col) => col.primaryKey())
    .addColumn('date_key', 'integer', (col) =>
      col.references('data_warehouse.dim_date.date_key').notNull()
    )
    .addColumn('product_key', 'integer', (col) =>
      col.references('data_warehouse.dim_product.product_key').notNull()
    )
    .addColumn('store_key', 'integer', (col) =>
      col.references('data_warehouse.dim_store.store_key').notNull()
    )
    .addColumn('quantity_on_hand', 'integer', (col) => col.notNull())
    .addColumn('snapshot_timestamp', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    // Could add other stock-related measures here if available, e.g., stock value
    // Add unique constraint for the grain
    .addUniqueConstraint('uq_stock_snapshot_grain', ['date_key', 'product_key', 'store_key'])
    .execute();

  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_stock_date').on('fact_stock_snapshot').column('date_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_stock_product').on('fact_stock_snapshot').column('product_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_stock_store').on('fact_stock_snapshot').column('store_key').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_stock_store').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_stock_product').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_stock_date').ifExists().execute();

  await db.schema
    .withSchema('data_warehouse')
    .dropTable('fact_stock_snapshot')
    .ifExists()
    .execute(); // This should also drop the unique constraint associated with the table.
}
