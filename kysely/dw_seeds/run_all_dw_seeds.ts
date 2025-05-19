import { Kysely } from 'kysely';
import { db } from '../../src/common/database/db'; // Adjust path if your db instance is located elsewhere
import { seedDimDate } from './00_seed_dim_dates'; // Added import for seedDimDate
import { seedDimCustomer } from './01_seed_dim_customer';
import { seedDimStore } from './02_seed_dim_store';
import { seedDimEmployee } from './03_seed_dim_employee';
import { seedDimProduct } from './04_seed_dim_product';
import { seedFactSales } from './05_seed_fact_sales';
import { seedFactStockSnapshot } from './06_seed_fact_stock_snapshot';

async function verifyDimensionData(db: Kysely<any>) {
    const dimensions = [
        { name: 'dim_date', count: await db.selectFrom('data_warehouse.dim_date').select(db.fn.count('date_key').as('count')).executeTakeFirst() },
        { name: 'dim_product', count: await db.selectFrom('data_warehouse.dim_product').select(db.fn.count('product_key').as('count')).executeTakeFirst() },
        { name: 'dim_customer', count: await db.selectFrom('data_warehouse.dim_customer').select(db.fn.count('customer_key').as('count')).executeTakeFirst() },
        { name: 'dim_store', count: await db.selectFrom('data_warehouse.dim_store').select(db.fn.count('store_key').as('count')).executeTakeFirst() },
        { name: 'dim_employee', count: await db.selectFrom('data_warehouse.dim_employee').select(db.fn.count('employee_key').as('count')).executeTakeFirst() }
    ];

    const missingDimensions = dimensions.filter(d => !d.count?.count);
    if (missingDimensions.length > 0) {
        throw new Error(`Missing data in dimensions: ${missingDimensions.map(d => d.name).join(', ')}`);
    }

    console.log('All dimensions verified successfully:');
    dimensions.forEach(d => console.log(`${d.name}: ${d.count?.count} records`));
}

async function main() {
    console.log('Starting Data Warehouse seeding process...');
    try {
        // First, verify that source tables have data
        const salesCount = await db.selectFrom('venda').select(db.fn.count('idVenda').as('count')).executeTakeFirst();
        const stockCount = await db.selectFrom('estoque').select(db.fn.count('idEstoque').as('count')).executeTakeFirst();

        if (!salesCount?.count || !stockCount?.count) {
            throw new Error('Source tables (venda, estoque) must be populated before running DW seeds. Please run the main seed.ts first.');
        }

        console.log('Source tables verified. Proceeding with dimension and fact table seeding...');

        // Get the date range from source data
        const dateRange = await db.selectFrom('venda')
            .select([
                db.fn.min('dataVenda').as('minDate'),
                db.fn.max('dataVenda').as('maxDate')
            ])
            .executeTakeFirst();

        if (!dateRange?.minDate || !dateRange?.maxDate) {
            throw new Error('Could not determine date range from sales data');
        }

        const startYear = new Date(dateRange.minDate).getFullYear();
        const endYear = new Date(dateRange.maxDate).getFullYear();

        // Populate dim_date first as it's a dependency
        await seedDimDate(db, startYear - 1, endYear + 1); // Add buffer years
        console.log('Dimension Date seeded successfully');

        await seedDimCustomer(db);
        console.log('Dimension Customer seeded successfully');

        await seedDimStore(db);
        console.log('Dimension Store seeded successfully');

        await seedDimEmployee(db);
        console.log('Dimension Employee seeded successfully');

        await seedDimProduct(db);
        console.log('Dimension Product seeded successfully');

        // Verify all dimensions are populated
        await verifyDimensionData(db);

        // Dependencies are met, now seed fact tables
        await seedFactSales(db);
        console.log('Fact Sales seeded successfully');

        // For fact_stock_snapshot, use the latest date from sales data
        const latestSaleDate = await db.selectFrom('venda')
            .select(db.fn.max('dataVenda').as('latestDate'))
            .executeTakeFirst();

        if (latestSaleDate?.latestDate) {
            const snapshotDate = new Date(latestSaleDate.latestDate).toISOString().split('T')[0];
            await seedFactStockSnapshot(db, snapshotDate);
            console.log(`Fact Stock Snapshot seeded successfully for date ${snapshotDate}`);
        } else {
            await seedFactStockSnapshot(db, new Date().toISOString().split('T')[0]); // Fallback to current date
            console.log('Fact Stock Snapshot seeded successfully for current date');
        }

        console.log('Data Warehouse seeding process completed successfully.');
    } catch (error) {
        console.error('Error during Data Warehouse seeding process:', error);
        process.exit(1); // Exit with error code
    } finally {
        await db.destroy(); // Ensure the database connection is closed
        console.log('Database connection closed.');
    }
}

main(); 