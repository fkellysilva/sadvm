import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('produto_promocao')
		.ifNotExists()
		.addColumn('id_promocao', 'integer', (col) =>
			col.references('promocao.id_promocao'))
		.addColumn('id_produto', 'integer', (col) =>
			col.references('produto.id_produto'))
		.addColumn('preco_promocional', sql`decimal(10,2)`)
		.addPrimaryKeyConstraint('pk_produto_promocao', ['id_promocao', 'id_produto'])
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('produto_promocao')
		.ifExists()
		.execute()
}
