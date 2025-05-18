import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('produto_fornecedor')
		.ifNotExists()
		.addColumn('id_produto', 'integer', (col) =>
			col.references('produto.id_produto'))
		.addColumn('id_fornecedor', 'integer', (col) =>
			col.references('fornecedor.id_fornecedor'))
		.addColumn('preco_compra', sql`decimal(10,2)`)
		.addColumn('prazo_entrega', 'integer')
		.addPrimaryKeyConstraint('produto_fornecedor_pk', ['id_produto', 'id_fornecedor'])
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('produto_fornecedor')
		.ifExists()
		.execute()
}
