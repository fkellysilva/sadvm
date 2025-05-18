import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('avaliacao')
		.ifNotExists()
		.addColumn('id_avaliacao', 'serial', (col) => col.primaryKey())
		.addColumn('id_produto', 'integer', (col) =>
			col.references('produto.id_produto'))
		.addColumn('id_cliente', 'integer', (col) =>
			col.references('cliente.id_cliente'))
		.addColumn('data_avaliacao', 'timestamp')
		.addColumn('nota', 'integer', (col) =>
			col.check(sql`nota >= 1 AND nota <= 5`))
		.addColumn('comentario', 'text')
		.execute()

	await db.schema
		.createIndex('idx_avaliacao_produto')
		.on('avaliacao')
		.columns(['id_produto'])
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropIndex('idx_avaliacao_produto')
		.execute()

	await db.schema
		.dropTable('avaliacao')
		.ifExists()
		.execute()
}
