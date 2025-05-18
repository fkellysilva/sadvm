import { Kysely, sql } from 'kysely';
import type { DB as VarejobaseDB } from '../../src/common/database/types'; // Assuming types for varejobase
// You'll need to define types for your data_warehouse schema or use 'any'
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance that can access both varejobase and data_warehouse schemas.
// import { db } from '../../src/common/database/db'; 

export async function seedDimCustomer(db: Kysely<any>): Promise<void> {
  console.log('Seeding dim_customer...');

  // Extract data from varejobase.cliente
  const sourceCustomers = await db
    .selectFrom('cliente') // Assumes 'cliente' is in the default schema or accessible
    .selectAll()
    .execute();

  if (sourceCustomers.length === 0) {
    console.log('No customers found in source table (cliente). Skipping seed.');
    return;
  }

  // Transform and map to dim_customer structure
  const dwCustomers = sourceCustomers.map(sc => ({
    customer_id: sc.idCliente, // Natural key from 'cliente.id_cliente'
    cpf: sc.cpf,               // From 'cliente.cpf'
    name: sc.nome,             // From 'cliente.nome'
    email: sc.email,           // From 'cliente.email'
    phone: sc.telefone,        // From 'cliente.telefone'
    address: sc.endereco,      // From 'cliente.endereco'
    city: sc.cidade,           // From 'cliente.cidade'
    state: sc.estado,          // From 'cliente.estado'
    zip_code: sc.cep,          // From 'cliente.cep'
    // customer_key is serial, so it will be auto-generated
  }));

  // Load into data_warehouse.dim_customer
  // Using .onConflict do nothing to handle potential re-runs if you want to avoid duplicates based on a constraint
  // Or, clear the table first for a fresh seed: await db.deleteFrom('data_warehouse.dim_customer').execute();
  await db
    .insertInto('data_warehouse.dim_customer')
    .values(dwCustomers)
    .onConflict(oc => oc
      .column('cpf') // The column with the unique constraint
      .doUpdateSet(eb => ({ // Update these columns if conflict occurs
        name: eb.ref('excluded.name'),
        email: eb.ref('excluded.email'),
        phone: eb.ref('excluded.phone'),
        address: eb.ref('excluded.address'),
        city: eb.ref('excluded.city'),
        state: eb.ref('excluded.state'),
        zip_code: eb.ref('excluded.zip_code'),
        customer_id: eb.ref('excluded.customer_id') // Also update customer_id if it can change for a CPF
      }))
    )
    .execute();

  console.log(`dim_customer seeded (inserted/updated) ${dwCustomers.length} records.`);
}

// Example of how to run (adjust as needed for your project setup):
/*
import { db } from '../../src/common/database/db'; // your Kysely instance

async function main() {
  try {
    await seedDimCustomer(db);
  } catch (error) {
    console.error('Error seeding dim_customer:', error);
  } finally {
    await db.destroy(); // Close connection if necessary
  }
}

main();
*/ 