import { Kysely } from 'kysely';
// import type { DB as VarejobaseDB } from '../../src/common/database/types';
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance.
// import { db } from '../../src/common/database/db';

export async function seedDimStore(db: Kysely<any>): Promise<void> {
  console.log('Seeding dim_store...');

  const sourceStores = await db
    .selectFrom('loja') // Assumes 'loja' is in the default schema or accessible
    .selectAll()
    .execute();

  if (sourceStores.length === 0) {
    console.log('No stores found in source table (loja). Skipping seed.');
    return;
  }

  const dwStores = sourceStores.map(ss => ({
    store_id: ss.idLoja,
    store_code: ss.codigoLoja,
    store_name: ss.nomeLoja,
    address: ss.endereco,
    city: ss.cidade,
    state: ss.estado,
    zip_code: ss.cep,
    phone: ss.telefone,
    manager_name: ss.gerente,
    // store_key is serial
  }));

  // Consider clearing the table for a fresh seed: await db.deleteFrom('data_warehouse.dim_store').execute();
  await db
    .insertInto('data_warehouse.dim_store')
    .values(dwStores)
    .onConflict(oc => oc
      .column('store_code') // The column with the unique constraint
      .doUpdateSet(eb => ({ // Update these columns if conflict occurs
        store_name: eb.ref('excluded.store_name'),
        address: eb.ref('excluded.address'),
        city: eb.ref('excluded.city'),
        state: eb.ref('excluded.state'),
        zip_code: eb.ref('excluded.zip_code'),
        phone: eb.ref('excluded.phone'),
        manager_name: eb.ref('excluded.manager_name'),
        store_id: eb.ref('excluded.store_id') // Also update store_id if it can change for a store_code
      }))
    )
    .execute();

  console.log(`dim_store seeded (inserted/updated) ${dwStores.length} records.`);
}

// Example of how to run:
/*
import { db } from '../../src/common/database/db';
async function main() {
  try {
    await seedDimStore(db);
  } catch (error) {
    console.error('Error seeding dim_store:', error);
  } finally {
    await db.destroy();
  }
}
main();
*/ 