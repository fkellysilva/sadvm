import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .createTable('dim_date')
    .ifNotExists()
    .addColumn('date_key', 'integer', (col) => col.primaryKey()) // YYYYMMDD
    .addColumn('date_actual', 'date', (col) => col.notNull().unique())
    .addColumn('year_actual', 'integer', (col) => col.notNull())
    .addColumn('quarter_actual', 'integer', (col) => col.notNull())
    .addColumn('month_actual', 'integer', (col) => col.notNull())
    .addColumn('day_actual', 'integer', (col) => col.notNull())
    .addColumn('day_of_week', 'integer', (col) => col.notNull()) // 0 for Sunday, 1 for Monday ... 6 for Saturday
    .addColumn('day_name', 'varchar(10)', (col) => col.notNull())
    .addColumn('month_name', 'varchar(10)', (col) => col.notNull())
    .addColumn('is_weekend', 'boolean', (col) => col.notNull())
    .addColumn('iso_week_of_year', 'integer', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema('data_warehouse')
    .dropTable('dim_date')
    .ifExists()
    .execute();
} 