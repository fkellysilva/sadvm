import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('produto')
		.ifNotExists()
		.addColumn('id_produto', 'serial', (col) => col.primaryKey())
		.addColumn('codigo_produto', 'varchar(20)', (col) => col.notNull().unique())
		.addColumn('nome_produto', 'varchar(100)', (col) => col.notNull())
		.addColumn('descricao', 'text')
		.addColumn('id_categoria', 'integer', (col) => 
			col.references('categoria.id_categoria'))
		.addColumn('marca', 'varchar(50)')
		.addColumn('preco_atual', sql`decimal(10,2)`)
		.addColumn('unidade_medida', 'varchar(20)')
		.addColumn('ativo', 'boolean', (col) => col.defaultTo(true))
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropTable('produto')
		.ifExists()
		.execute()
}
