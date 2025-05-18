import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('promocao')
		.ifNotExists()
		.addColumn('id_promocao', 'serial', (col) => col.primaryKey())
		.addColumn('nome_promocao', 'varchar(100)', (col) => col.notNull())
		.addColumn('descricao', 'text')
		.addColumn('data_inicio', 'date')
		.addColumn('data_fim', 'date')
		.addColumn('percentual_desconto', sql`decimal(5,2)`)
		.addColumn('ativa', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('promocao')
		.ifExists()
		.execute()
}
