import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('venda')
		.ifNotExists()
		.addColumn('id_venda', 'serial', (col) => col.primaryKey())
		.addColumn('numero_venda', 'varchar(20)', (col) => col.notNull().unique())
		.addColumn('id_cliente', 'integer', (col) => 
			col.references('cliente.id_cliente'))
		.addColumn('id_loja', 'integer', (col) =>
			col.references('loja.id_loja'))
		.addColumn('id_funcionario', 'integer', (col) =>
			col.references('funcionario.id_funcionario'))
		.addColumn('data_venda', 'timestamp')
		.addColumn('valor_total', sql`decimal(10,2)`)
		.addColumn('desconto_total', sql`decimal(10,2)`)
		.addColumn('forma_pagamento', 'varchar(30)')
		.addColumn('status_venda', 'varchar(20)')
		.execute()

	await db.schema
		.createIndex('idx_venda_data')
		.on('venda')
		.columns(['data_venda'])
		.execute()

	await db.schema
		.createIndex('idx_venda_cliente')
		.on('venda')
		.columns(['id_cliente'])
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.dropIndex('idx_venda_cliente')
		.execute()

	await db.schema
		.dropIndex('idx_venda_data')
		.execute()

	await db.schema
		.dropTable('venda')
		.ifExists()
		.execute()
}
