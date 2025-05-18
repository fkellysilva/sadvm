import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('estoque')
		.ifNotExists()
		.addColumn('id_estoque', 'serial', (col) => col.primaryKey())
		.addColumn('id_produto', 'integer', (col) =>
			col.references('produto.id_produto'))
		.addColumn('id_loja', 'integer', (col) =>
			col.references('loja.id_loja'))
		.addColumn('quantidade_atual', 'integer')
		.addColumn('quantidade_minima', 'integer')
		.addColumn('quantidade_maxima', 'integer')
		.addUniqueConstraint('uk_produto_loja', ['id_produto', 'id_loja'])
		.execute()

	await db.schema
		.createIndex('idx_estoque_produto')
		.on('estoque')
		.columns(['id_produto'])
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropIndex('idx_estoque_produto')
		.execute()

	await db.schema
		.dropTable('estoque')
		.ifExists()
		.execute()
}
