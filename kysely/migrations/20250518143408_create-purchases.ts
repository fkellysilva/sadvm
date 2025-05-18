import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('compra')
		.ifNotExists()
		.addColumn('id_compra', 'serial', (col) => col.primaryKey())
		.addColumn('numero_compra', 'varchar(20)', (col) => col.notNull().unique())
		.addColumn('id_fornecedor', 'integer', (col) =>
			col.references('fornecedor.id_fornecedor'))
		.addColumn('id_loja', 'integer', (col) =>
			col.references('loja.id_loja'))
		.addColumn('data_compra', 'timestamp')
		.addColumn('valor_total', sql`decimal(10,2)`)
		.addColumn('status_compra', 'varchar(20)')
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('compra')
		.ifExists()
		.execute()
}
