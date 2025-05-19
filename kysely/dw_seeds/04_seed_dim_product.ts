import { Kysely, sql } from 'kysely';
// import type { DB as VarejobaseDB } from '../../src/common/database/types';
// import type { DB as DataWarehouseDB } from './path-to-your-data-warehouse-types';

// Assume 'db' is your Kysely instance.
// import { db } from '../../src/common/database/db';

export async function seedDimProduct(db: Kysely<any>): Promise<void> {
  console.log('Seeding dim_product...');

  // Extract data from varejobase.produto and join with varejobase.categoria
  const sourceProducts = await db
    .selectFrom('produto')
    .innerJoin('categoria', 'categoria.idCategoria', 'produto.idCategoria')
    .select([
      'produto.idProduto',
      'produto.codigoProduto',
      'produto.nomeProduto',
      'produto.descricao as productDescription', // alias to avoid conflict if DB types differ for 'descricao'
      'categoria.nomeCategoria',
      'produto.marca',
      'produto.unidadeMedida',
      'produto.precoAtual',
      // 'produto.dataCadastro', // Removed as it does not exist
    ])
    .execute();

  if (sourceProducts.length === 0) {
    console.log('No products found in source tables (produto, categoria). Skipping seed.');
    return;
  }

  const now = new Date(); // Use current date for valid_from_date

  const dwProducts = sourceProducts.map(sp => ({
    product_id: sp.idProduto,
    product_code: sp.codigoProduto,
    product_name: sp.nomeProduto,
    product_description: sp.productDescription,
    category_name: sp.nomeCategoria,
    brand: sp.marca,
    unit_measure: sp.unidadeMedida,
    unit_price: sp.precoAtual, // This is preco_atual from source, representing current price
    valid_from_date: now, // Use current date as creation date for SCD
    valid_to_date: null,       // SCD Type 2: End date (null for current)
    is_current_version: true,  // SCD Type 2: Flag for current version
    // product_key is serial
  }));

  // Clear existing data to avoid SCD conflicts
  await db.deleteFrom('data_warehouse.dim_product').execute();
  
  await db
    .insertInto('data_warehouse.dim_product')
    .values(dwProducts)
    .execute();

  console.log(`dim_product seeded with ${dwProducts.length} records.`);
}

// Example of how to run:
/*
import { db } from '../../src/common/database/db';
async function main() {
  try {
    await seedDimProduct(db);
  } catch (error) {
    console.error('Error seeding dim_product:', error);
  } finally {
    await db.destroy();
  }
}
main();
*/ 