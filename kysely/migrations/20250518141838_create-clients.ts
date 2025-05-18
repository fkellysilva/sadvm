import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('cliente')
		.ifNotExists()
		.addColumn('id_cliente', 'serial', (col) => col.primaryKey())
		.addColumn('cpf', 'varchar(11)', (col) => col.notNull().unique())
		.addColumn('nome', 'varchar(100)', (col) => col.notNull())
		.addColumn('email', 'varchar(100)')
		.addColumn('telefone', 'varchar(20)')
		.addColumn('endereco', 'varchar(200)')
		.addColumn('cidade', 'varchar(50)')
		.addColumn('estado', 'char(2)')
		.addColumn('cep', 'varchar(8)')
		.addColumn('ativo', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('cliente')
		.ifExists()
		.execute()
}
