import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('funcionario')
		.ifNotExists()
		.addColumn('id_funcionario', 'serial', (col) => col.primaryKey())
		.addColumn('codigo_funcionario', 'varchar(10)', (col) => col.notNull().unique())
		.addColumn('nome', 'varchar(100)', (col) => col.notNull())
		.addColumn('cargo', 'varchar(50)')
		.addColumn('id_loja', 'integer', (col) => 
			col.references('loja.id_loja'))
		.addColumn('salario', sql`decimal(10,2)`)
		.addColumn('ativo', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('funcionario')
		.ifExists()
		.execute()
}
