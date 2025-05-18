import { Kysely } from 'kysely';
// import type { DB as VarejobaseDB } from '../../src/common/database/types';
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance.
// import { db } from '../../src/common/database/db';

export async function seedDimEmployee(db: Kysely<any>): Promise<void> {
  console.log('Seeding dim_employee...');

  const sourceEmployees = await db
    .selectFrom('funcionario') // Assumes 'funcionario' is in the default schema or accessible
    .selectAll()
    .execute();

  if (sourceEmployees.length === 0) {
    console.log('No employees found in source table (funcionario). Skipping seed.');
    return;
  }

  const dwEmployees = sourceEmployees.map(se => ({
    employee_id: se.idFuncionario,
    employee_code: se.codigoFuncionario,
    name: se.nome,
    position: se.cargo,
    // employee_key is serial. idLoja is not directly part of this dimension table as per schema.
  }));

  // Consider clearing the table for a fresh seed: await db.deleteFrom('data_warehouse.dim_employee').execute();
  await db
    .insertInto('data_warehouse.dim_employee')
    .values(dwEmployees)
    .onConflict(oc => oc
      .column('employee_code') // The column with the unique constraint
      .doUpdateSet(eb => ({ // Update these columns if conflict occurs
        name: eb.ref('excluded.name'),
        position: eb.ref('excluded.position'),
        employee_id: eb.ref('excluded.employee_id') // Also update employee_id if it can change
      }))
    )
    .execute();

  console.log(`dim_employee seeded (inserted/updated) ${dwEmployees.length} records.`);
}

// Example of how to run:
/*
import { db } from '../../src/common/database/db';
async function main() {
  try {
    await seedDimEmployee(db);
  } catch (error) {
    console.error('Error seeding dim_employee:', error);
  } finally {
    await db.destroy();
  }
}
main();
*/ 