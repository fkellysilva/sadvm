import { Kysely, sql } from 'kysely';
// import type { DB as VarejobaseDB } from '../../src/common/database/types';
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance.
// import { db } from '../../src/common/database/db';

export async function seedFactStockSnapshot(db: Kysely<any>, snapshotDateString?: string): Promise<void> {
  console.log('Seeding fact_stock_snapshot...');

  // Determine the snapshot date
  // If no date string is provided, use the current date.
  // The date string should be in 'YYYY-MM-DD' format.
  const snapshotDate = snapshotDateString ? new Date(snapshotDateString) : new Date();
  const snapshotDateFormatted = snapshotDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

  // await db.deleteFrom('data_warehouse.fact_stock_snapshot').where(sql<boolean>`date(snapshot_timestamp) = ${snapshotDateFormatted}`).execute();

  // 1. Lookup date_key for the snapshotDate
  const dateKeyResult = await db.selectFrom('data_warehouse.dim_date')
    .select('date_key')
    .where(sql<boolean>`date(date_actual) = ${snapshotDateFormatted}`)
    .limit(1)
    .executeTakeFirst();

  if (!dateKeyResult || dateKeyResult.date_key == null) {
    console.warn(`Date key not found or is invalid for snapshot date: ${snapshotDateFormatted}. Cannot seed fact_stock_snapshot.`);
    return;
  }
  const snapshotDateKey = dateKeyResult.date_key;

  // 2. Extract current stock levels from varejobase.estoque
  const sourceStock = await db
    .selectFrom('estoque')
    .selectAll()
    .execute();

  if (sourceStock.length === 0) {
    console.log('No stock data found in source table (estoque). Skipping seed.');
    return;
  }

  const dwFactStockSnapshots: any[] = [];

  for (const item of sourceStock) {
    // 3. Lookup product_key from dim_product (SCD Type 2 - current for snapshotDate)
    const productKeyResult = await db.selectFrom('data_warehouse.dim_product')
      .select('product_key')
      .where('product_id', '=', item.idProduto)
      .where('valid_from_date', '<=', snapshotDate)
      .where(eb => eb.or([
        eb('valid_to_date', 'is', null),
        eb('valid_to_date', '>', snapshotDate)
      ]))
      .orderBy('valid_from_date', 'desc')
      .limit(1)
      .executeTakeFirst();

    if (!productKeyResult || productKeyResult.product_key == null) {
      console.warn(`Product key not found or is null for product ID: ${item.idProduto} current at ${snapshotDateFormatted}. Skipping stock item ID: ${item.idEstoque || 'N/A'}`);
      continue;
    }

    // 4. Lookup store_key from dim_store
    const storeKeyResult = await db.selectFrom('data_warehouse.dim_store')
      .select('store_key')
      .where('store_id', '=', item.idLoja)
      .limit(1)
      .executeTakeFirst();

    if (!storeKeyResult || storeKeyResult.store_key == null) {
      console.warn(`Store key not found or is null for store ID: ${item.idLoja}. Skipping stock item ID: ${item.idEstoque || 'N/A'}`);
      continue;
    }

    dwFactStockSnapshots.push({
      date_key: snapshotDateKey,
      product_key: productKeyResult.product_key,
      store_key: storeKeyResult.store_key,
      quantity_on_hand: item.quantidadeAtual,
      snapshot_timestamp: snapshotDate, // Store the actual date/timestamp of the snapshot
    });
  }

  if (dwFactStockSnapshots.length > 0) {
    // The table has a unique constraint on (date_key, product_key, store_key).
    // For an initial load or specific snapshot date, you might clear previous entries for that date
    // or use ON CONFLICT UPDATE if your DB supports it and that's the desired behavior.
    // Example: .onConflict((oc) => oc.columns(['date_key', 'product_key', 'store_key']).doUpdateSet({ quantity_on_hand: sql`excluded.quantity_on_hand` }))
    await db.insertInto('data_warehouse.fact_stock_snapshot')
      .values(dwFactStockSnapshots)
      .onConflict(oc => oc.columns(['date_key', 'product_key', 'store_key'])
        .doUpdateSet(eb => ({
            quantity_on_hand: eb.ref('excluded.quantity_on_hand'),
            snapshot_timestamp: eb.ref('excluded.snapshot_timestamp')
        }))
      )
      .execute();
    console.log(`fact_stock_snapshot seeded/updated with ${dwFactStockSnapshots.length} records for date ${snapshotDateFormatted}.`);
  } else {
    console.log(`No data to seed into fact_stock_snapshot for date ${snapshotDateFormatted} after lookups.`);
  }
}

// Example of how to run:
/*
import { db } from '../../src/common/database/db';
async function main() {
  try {
    // To seed for today:
    await seedFactStockSnapshot(db);
    // To seed for a specific date:
    // await seedFactStockSnapshot(db, '2023-10-26'); 
  } catch (error) {
    console.error('Error seeding fact_stock_snapshot:', error);
  } finally {
    await db.destroy();
  }
}
main();
*/ 