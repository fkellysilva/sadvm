import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('item_venda')
		.ifNotExists()
		.addColumn('id_item', 'serial', (col) => col.primaryKey())
		.addColumn('id_venda', 'integer', (col) =>
			col.references('venda.id_venda'))
		.addColumn('id_produto', 'integer', (col) =>
			col.references('produto.id_produto'))
		.addColumn('quantidade', 'integer')
		.addColumn('preco_unitario', sql`decimal(10,2)`)
		.addColumn('desconto', sql`decimal(10,2)`)
		.addColumn('valor_total', sql`decimal(10,2)`)
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('item_venda')
		.ifExists()
		.execute()
}
