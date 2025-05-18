import { Kysely, sql } from 'kysely';
// import type { DB as VarejobaseDB } from '../../src/common/database/types';
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance.
// import { db } from '../../src/common/database/db';

export async function seedFactSales(db: Kysely<any>): Promise<void> {
  console.log('Seeding fact_sales...');

  // Clear the table for a fresh seed during development/initial load
  // For incremental loads, this would be different.
  // await db.deleteFrom('data_warehouse.fact_sales').execute();

  // Extract data from varejobase.itemVenda and join with varejobase.venda
  const sourceSaleItems = await db
    .selectFrom('itemVenda')
    .innerJoin('venda', 'venda.idVenda', 'itemVenda.idVenda')
    .select([
      'itemVenda.id_item as originalSaleItemId',
      'itemVenda.idProduto',
      'itemVenda.quantidade',
      'itemVenda.precoUnitario',
      'itemVenda.desconto',
      'itemVenda.valorTotal as lineTotalAmount',
      'venda.idVenda as originalSaleId',
      'venda.idCliente',
      'venda.idLoja',
      'venda.idFuncionario',
      'venda.dataVenda',
    ])
    .execute();

  if (sourceSaleItems.length === 0) {
    console.log('No sale items found in source tables. Skipping seed.');
    return;
  }

  const dwFactSales: any[] = [];

  for (const item of sourceSaleItems) {
    const saleDate = item.dataVenda instanceof Date ? item.dataVenda.toISOString().split('T')[0] : item.dataVenda.toString().split('T')[0];

    const dateKeyResult = await db.selectFrom('data_warehouse.dim_date')
      .select('date_key')
      // Use sql.raw to ensure the date comparison is handled correctly by the DB
      // and to avoid potential type issues with Kysely's ExpressionBuilder.
      // Ensure item.dataVenda is formatted as 'YYYY-MM-DD' string for this comparison if it's a JS Date.
      .where(sql<boolean>`date(date_actual) = ${saleDate}`)
      .limit(1)
      .executeTakeFirst();

    if (!dateKeyResult) {
      console.warn(`Date key not found for date: ${item.dataVenda}. Skipping sale item ID: ${item.originalSaleItemId}`);
      continue;
    }

    const productKeyResult = await db.selectFrom('data_warehouse.dim_product')
      .select('product_key')
      .where('product_id', '=', item.idProduto)
      .where('valid_from_date', '<=', item.dataVenda)
      // Corrected SCD Type 2 condition:
      // (valid_to_date IS NULL OR valid_to_date > item.dataVenda)
      // This ensures we get the record that was active at the time of the sale.
      .where(eb => eb.or([
        eb('valid_to_date', 'is', null),
        eb('valid_to_date', '>', item.dataVenda)
      ]))
      .orderBy('valid_from_date', 'desc') 
      .limit(1)
      .executeTakeFirst();

    if (!productKeyResult) {
      console.warn(`Product key not found for product ID: ${item.idProduto} at date ${item.dataVenda}. Skipping sale item ID: ${item.originalSaleItemId}`);
      continue;
    }

    const customerKeyResult = await db.selectFrom('data_warehouse.dim_customer')
      .select('customer_key')
      .where('customer_id', '=', item.idCliente)
      .limit(1)
      .executeTakeFirst();
    if (!customerKeyResult) {
      console.warn(`Customer key not found for customer ID: ${item.idCliente}. Skipping sale item ID: ${item.originalSaleItemId}`);
      continue;
    }

    const storeKeyResult = await db.selectFrom('data_warehouse.dim_store')
      .select('store_key')
      .where('store_id', '=', item.idLoja)
      .limit(1)
      .executeTakeFirst();
    if (!storeKeyResult) {
      console.warn(`Store key not found for store ID: ${item.idLoja}. Skipping sale item ID: ${item.originalSaleItemId}`);
      continue;
    }

    let employeeKey: number | null = null;
    if (item.idFuncionario) {
      const employeeKeyResult = await db.selectFrom('data_warehouse.dim_employee')
        .select('employee_key')
        .where('employee_id', '=', item.idFuncionario)
        .limit(1)
        .executeTakeFirst();
      if (employeeKeyResult) {
        employeeKey = employeeKeyResult.employee_key;
      } else {
        console.warn(`Employee key not found for employee ID: ${item.idFuncionario}. Setting to NULL for sale item ID: ${item.originalSaleItemId}`);
      }
    }

    dwFactSales.push({
      date_key: dateKeyResult.date_key,
      product_key: productKeyResult.product_key,
      customer_key: customerKeyResult.customer_key,
      store_key: storeKeyResult.store_key,
      employee_key: employeeKey,
      original_sale_id: item.originalSaleId,
      original_sale_item_id: item.originalSaleItemId,
      quantity_sold: item.quantidade,
      unit_price_at_sale: item.precoUnitario,
      discount_amount_item: item.desconto,
      line_total_amount: item.lineTotalAmount,
    });
  }

  if (dwFactSales.length > 0) {
    // Kysely insert many might be slow for very large arrays. Consider chunking for production.
    await db.insertInto('data_warehouse.fact_sales').values(dwFactSales).execute();
    console.log(`fact_sales seeded with ${dwFactSales.length} records.`);
  } else {
    console.log('No data to seed into fact_sales after lookups.');
  }
}

// Example of how to run:
/*
import { db } from '../../src/common/database/db';
async function main() {
  try {
    await seedFactSales(db);
  } catch (error) {
    console.error('Error seeding fact_sales:', error);
  } finally {
    await db.destroy();
  }
}
main();
*/ 