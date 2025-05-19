import { Kysely, sql } from 'kysely';
// Assuming DB types are for the OLTP (varejobase)
import type { DB } from '../../src/common/database/types';

export async function seedFactStockSnapshot(db: Kysely<any>, snapshotDateISO: string): Promise<void> {
  console.log(`Seeding data_warehouse.fact_stock_snapshot for date: ${snapshotDateISO}...`);

  // 1. Get the date_key for the given snapshotDateISO
  const dateKeyResult = await db
    .selectFrom('data_warehouse.dim_date')
    .select('date_key')
    .where(sql<string>`to_char(date_actual, 'YYYY-MM-DD')`, '=', snapshotDateISO)
    .executeTakeFirst();

  if (!dateKeyResult) {
    console.warn(`Date key not found for ${snapshotDateISO} in dim_date. Skipping fact_stock_snapshot seed for this date.`);
    return;
  }
  const dateKey = dateKeyResult.date_key;

  // 2. Select all current stock levels from the OLTP database
  // We join with produto and loja to get their business keys (codigoProduto, codigoLoja)
  // which are used in dim_product and dim_store.
  const currentStock = await db
    .selectFrom('estoque as est')
    .innerJoin('produto as p', 'p.idProduto', 'est.idProduto')
    .innerJoin('loja as l', 'l.idLoja', 'est.idLoja')
    .select([
      'est.idEstoque as oltp_estoque_id', // Assuming idEstoque is the PK of estoque table
      'p.codigoProduto as product_code',
      'l.codigoLoja as store_code',
      'est.quantidadeAtual as quantity_on_hand',
      'est.quantidadeMinima as min_stock_level',
      'est.quantidadeMaxima as max_stock_level'
    ])
    .execute();

  if (currentStock.length === 0) {
    console.log('No stock data found in OLTP to seed into data_warehouse.fact_stock_snapshot.');
    return;
  }

  // 3. For each stock item, look up the dimension keys for product and store
  const factStockDataPromises = currentStock.map(async (stockItem: any) => {
    const productKeyResult = await db
      .selectFrom('data_warehouse.dim_product')
      .select('product_key')
      .where('product_code', '=', stockItem.product_code)
      // .where('is_current', '=', true) // Assuming SCD Type 1 or unique product_code
      .executeTakeFirst();

    const storeKeyResult = await db
      .selectFrom('data_warehouse.dim_store')
      .select('store_key')
      .where('store_code', '=', stockItem.store_code)
      // .where('is_current', '=', true) // Assuming SCD Type 1 or unique store_code
      .executeTakeFirst();

    if (!productKeyResult || !storeKeyResult) {
      console.warn(
        `Could not find all dimension keys for OLTP stock ID: ${stockItem.oltp_estoque_id}. Skipping. Details:`,
        { productKeyResult, storeKeyResult, product_code: stockItem.product_code, store_code: stockItem.store_code }
      );
      return null;
    }

    return {
      date_key: dateKey, // Use the common dateKey for this snapshot
      product_key: productKeyResult.product_key,
      store_key: storeKeyResult.store_key,
      oltp_estoque_id: stockItem.oltp_estoque_id,
      quantity_on_hand: Number(stockItem.quantity_on_hand),
      min_stock_level: Number(stockItem.min_stock_level),
      max_stock_level: Number(stockItem.max_stock_level),
    };
  });

  const factStockSnapshotEntries = (await Promise.all(factStockDataPromises))
    .filter(data => data !== null);

  if (factStockSnapshotEntries.length > 0) {
    // For a snapshot fact table, you typically insert, not clear and insert,
    // unless you are re-seeding for a *specific day*.
    // The run_all_dw_seeds.ts script logic suggests it's for one specific snapshot date.
    // So, we should delete records for THIS specific date_key before inserting.
    await db
      .deleteFrom('data_warehouse.fact_stock_snapshot')
      .where('date_key', '=', dateKey)
      .execute();
    
    console.log(`Cleared existing data from data_warehouse.fact_stock_snapshot for date_key: ${dateKey}`);

    // Batch insert
    const batchSize = 100; // Adjust batch size as needed
    for (let i = 0; i < factStockSnapshotEntries.length; i += batchSize) {
      const batch = factStockSnapshotEntries.slice(i, i + batchSize);
      await db.insertInto('data_warehouse.fact_stock_snapshot').values(batch as any).execute();
    }
    console.log(`Successfully seeded ${factStockSnapshotEntries.length} records into data_warehouse.fact_stock_snapshot for date_key: ${dateKey}.`);
  } else {
    console.log(`No valid data to seed into data_warehouse.fact_stock_snapshot for date_key: ${dateKey} after dimension lookup.`);
  }
} 