import { Kysely, sql } from 'kysely';
import type { DB } from '../../src/common/database/types'; // Main DB types

// Changed function signature to use Kysely<any>
export async function seedFactSales(db: Kysely<any>): Promise<void> {
  console.log('Seeding data_warehouse.fact_sales...');

  // 1. Select all sales items from the OLTP database
  const salesItems = await db // Use db directly
    .selectFrom('itemVenda as iv')
    .innerJoin('venda as v', 'v.idVenda', 'iv.idVenda')
    .innerJoin('produto as p', 'p.idProduto', 'iv.idProduto')
    .innerJoin('cliente as c', 'c.idCliente', 'v.idCliente')
    .innerJoin('loja as l', 'l.idLoja', 'v.idLoja')
    .innerJoin('funcionario as e', 'e.idFuncionario', 'v.idFuncionario')
    .select([
      'iv.idItem as olpt_item_venda_id',
      'v.idVenda as olpt_venda_id',
      'v.dataVenda as sale_date',
      'c.cpf as customer_cpf',
      'e.codigoFuncionario as employee_code',
      'l.codigoLoja as store_code',
      'p.codigoProduto as product_code',
      'iv.quantidade as quantity_sold',
      'iv.preco_unitario as unit_price',
      'iv.desconto as item_discount_amount',
      sql<number>`iv.quantidade * iv.preco_unitario`.as('gross_amount'),
      'iv.valor_total as net_amount_after_item_discount',
      'v.descontoTotal as sale_total_discount',
      'v.valorTotal as sale_total_value'
    ])
    .execute();

  if (salesItems.length === 0) {
    console.log('No sales items found in OLTP to seed into data_warehouse.fact_sales.');
    return;
  }

  const factSalesData = await Promise.all(
    salesItems.map(async (item: any) => { // item implicitly has any type from Kysely<any>
      const dateKey = await db // Use db directly
        .selectFrom('data_warehouse.dim_date') // Schema-qualified
        .select('date_key')
        .where(sql<string>`to_char(date_actual, 'YYYY-MM-DD')`, '=', sql<string>`to_char(${item.sale_date}::date, 'YYYY-MM-DD')`)
        .executeTakeFirst();

      const customerKey = await db // Use db directly
        .selectFrom('data_warehouse.dim_customer') // Schema-qualified
        .select('customer_key')
        .where('cpf', '=', item.customer_cpf) // Changed from customer_cpf to cpf to match dim_customer seed
        // .where('is_current', '=', true) // Assuming dim_customer is SCD Type 1 or this is handled by unique CPF constraint
        .executeTakeFirst();

      const employeeKey = await db // Use db directly
        .selectFrom('data_warehouse.dim_employee') // Schema-qualified
        .select('employee_key')
        .where('employee_code', '=', item.employee_code)
        // .where('is_current', '=', true) // Assuming SCD Type 1 or handled by unique code
        .executeTakeFirst();
      
      const storeKey = await db // Use db directly
        .selectFrom('data_warehouse.dim_store') // Schema-qualified
        .select('store_key')
        .where('store_code', '=', item.store_code)
        // .where('is_current', '=', true) // Assuming SCD Type 1 or handled by unique code
        .executeTakeFirst();

      const productKey = await db // Use db directly
        .selectFrom('data_warehouse.dim_product') // Schema-qualified
        .select('product_key')
        .where('product_code', '=', item.product_code)
        // .where('is_current', '=', true) // Assuming SCD Type 1 or handled by unique code
        .executeTakeFirst();

      if (!dateKey || !customerKey || !employeeKey || !storeKey || !productKey) {
        console.warn(
          `Could not find all dimension keys for OLTP sale item ID: ${item.olpt_item_venda_id}. Skipping. Details:`,
          { dateKey, customerKey, employeeKey, storeKey, productKey, saleDate: item.sale_date, customer_cpf: item.customer_cpf, employee_code: item.employee_code, store_code: item.store_code, product_code: item.product_code }
        );
        return null;
      }
      
      const itemGrossAmount = Number(item.gross_amount);
      const itemDiscount = Number(item.item_discount_amount);
      const netAfterItemDiscount = Number(item.net_amount_after_item_discount);
      const saleTotalValue = Number(item.sale_total_value);
      const saleTotalDiscount = Number(item.sale_total_discount);

      const itemProportionOfSale = saleTotalValue > 0 ? netAfterItemDiscount / saleTotalValue : 0;
      const proportionalSaleDiscount = saleTotalDiscount * itemProportionOfSale;
      const finalNetAmount = netAfterItemDiscount - proportionalSaleDiscount;

      return {
        date_key: dateKey.date_key,
        customer_key: customerKey.customer_key,
        employee_key: employeeKey.employee_key,
        store_key: storeKey.store_key,
        product_key: productKey.product_key,
        oltp_sale_id: item.olpt_venda_id, // Already number if from DB
        oltp_sale_item_id: item.olpt_item_venda_id, // Already number
        quantity_sold: item.quantity_sold, // Already number
        unit_price: Number(item.unit_price),
        gross_amount: itemGrossAmount,
        item_discount_amount: itemDiscount,
        net_amount_after_item_discount: netAfterItemDiscount, 
        proportional_sale_discount_amount: Number(proportionalSaleDiscount.toFixed(2)),
        final_net_amount: Number(finalNetAmount.toFixed(2)),
      };
    })
  );

  const validFactSalesData = factSalesData.filter(data => data !== null);

  if (validFactSalesData.length > 0) {
    await db.deleteFrom('data_warehouse.fact_sales').execute(); // Schema-qualified

    const batchSize = 100;
    for (let i = 0; i < validFactSalesData.length; i += batchSize) {
      const batch = validFactSalesData.slice(i, i + batchSize);
      await db.insertInto('data_warehouse.fact_sales').values(batch as any).execute(); // Schema-qualified, cast batch as any if type issues persist
    }
    console.log(`Successfully seeded ${validFactSalesData.length} records into data_warehouse.fact_sales.`);
  } else {
    console.log('No valid data to seed into data_warehouse.fact_sales after dimension lookup.');
  }
} 