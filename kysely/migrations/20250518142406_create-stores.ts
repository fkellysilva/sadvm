import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('loja')
		.ifNotExists()
		.addColumn('id_loja', 'serial', (col) => col.primaryKey())
		.addColumn('codigo_loja', 'varchar(10)', (col) => col.notNull().unique())
		.addColumn('nome_loja', 'varchar(50)', (col) => col.notNull())
		.addColumn('endereco', 'varchar(200)')
		.addColumn('cidade', 'varchar(50)')
		.addColumn('estado', 'char(2)')
		.addColumn('cep', 'varchar(8)')
		.addColumn('telefone', 'varchar(20)')
		.addColumn('gerente', 'varchar(100)')
		.addColumn('ativa', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('loja')
		.ifExists()
		.execute()
}
