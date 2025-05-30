import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema('data_warehouse').ifNotExists().execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropSchema('data_warehouse').ifExists().execute();
} 