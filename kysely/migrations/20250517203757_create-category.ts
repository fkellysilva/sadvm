import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('categoria')
		.ifNotExists()
		.addColumn('id_categoria', 'serial', (col) => col.primaryKey())
		.addColumn('nome_categoria', 'varchar(50)', (col) => col.notNull())
		.addColumn('descricao', 'text')
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('categoria')
		.ifExists()
		.execute()
}
