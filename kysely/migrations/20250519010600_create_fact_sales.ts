import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('fact_sales')
    .ifNotExists()
    .addColumn('sales_fact_key', 'serial', (col) => col.primaryKey()) // Surrogate key for the fact record
    .addColumn('date_key', 'integer', (col) => 
      col.references('data_warehouse.dim_date.date_key').notNull()
    )
    .addColumn('product_key', 'integer', (col) =>
      col.references('data_warehouse.dim_product.product_key').notNull()
    )
    .addColumn('customer_key', 'integer', (col) =>
      col.references('data_warehouse.dim_customer.customer_key').notNull()
    )
    .addColumn('store_key', 'integer', (col) =>
      col.references('data_warehouse.dim_store.store_key').notNull()
    )
    .addColumn('employee_key', 'integer', (col) => // Nullable if sale not tied to an employee
      col.references('data_warehouse.dim_employee.employee_key') 
    )
    .addColumn('original_sale_id', 'integer') // Degenerate dimension from 'venda.id_venda'
    .addColumn('original_sale_item_id', 'integer') // Degenerate dimension from 'item_venda.id_item'
    .addColumn('quantity_sold', 'integer', (col) => col.notNull())
    .addColumn('unit_price_at_sale', sql`decimal(10,2)`, (col) => col.notNull()) // Price at the time of sale
    .addColumn('discount_amount_item', sql`decimal(10,2)`)
    .addColumn('line_total_amount', sql`decimal(10,2)`, (col) => col.notNull()) // quantity * unit_price - discount
    // Add more measures as needed, e.g., total_sale_amount, total_sale_discount from 'venda' if grain is sale level.
    // Current grain is sale item level.
    .execute();

  // Indexing foreign keys for performance
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_sales_date').on('fact_sales').column('date_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_sales_product').on('fact_sales').column('product_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_sales_customer').on('fact_sales').column('customer_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_sales_store').on('fact_sales').column('store_key').execute();
  await db.schema.withSchema('data_warehouse').createIndex('idx_fact_sales_employee').on('fact_sales').column('employee_key').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_sales_employee').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_sales_store').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_sales_customer').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_sales_product').ifExists().execute();
  await db.schema.withSchema('data_warehouse').dropIndex('idx_fact_sales_date').ifExists().execute();

  await db.schema
    .withSchema('data_warehouse')
    .dropTable('fact_sales')
    .ifExists()
    .execute();
} 