import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('fornecedor')
		.ifNotExists()
		.addColumn('id_fornecedor', 'serial', (col) => col.primaryKey())
		.addColumn('cnpj', 'varchar(14)', (col) => col.notNull().unique())
		.addColumn('razao_social', 'varchar(100)', (col) => col.notNull())
		.addColumn('nome_fantasia', 'varchar(100)')
		.addColumn('telefone', 'varchar(20)')
		.addColumn('email', 'varchar(100)')
		.addColumn('endereco', 'varchar(200)')
		.addColumn('cidade', 'varchar(50)')
		.addColumn('estado', 'char(2)')
		.addColumn('ativo', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('fornecedor')
		.ifExists()
		.execute()
}
