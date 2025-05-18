import { db } from '../../src/common/database/db'; // Adjust path if your db instance is located elsewhere
import { seedDimDate } from './00_seed_dim_dates'; // Added import for seedDimDate
import { seedDimCustomer } from './01_seed_dim_customer';
import { seedDimStore } from './02_seed_dim_store';
import { seedDimEmployee } from './03_seed_dim_employee';
import { seedDimProduct } from './04_seed_dim_product';
import { seedFactSales } from './05_seed_fact_sales';
import { seedFactStockSnapshot } from './06_seed_fact_stock_snapshot';

async function main() {
  console.log('Starting Data Warehouse seeding process...');
  try {
    // Populate dim_date first as it's a dependency
    await seedDimDate(db); // Call the imported function, can pass custom years: await seedDimDate(db, 2019, 2026);
    
    await seedDimCustomer(db);
    await seedDimStore(db);
    await seedDimEmployee(db);
    await seedDimProduct(db);
    // Dependencies are met, now seed fact tables
    await seedFactSales(db);
    
    // For fact_stock_snapshot, decide on the snapshot date.
    // Running for current date by default. Pass a 'YYYY-MM-DD' string for a specific date.
    await seedFactStockSnapshot(db); 
    // Example for a specific date:
    // await seedFactStockSnapshot(db, '2023-01-01');

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