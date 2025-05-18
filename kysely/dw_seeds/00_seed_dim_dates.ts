import { Kysely, sql as kyselySql } from 'kysely'; // Assuming Kysely
// import type { DB } from '../src/db/types'; // Your Kysely generated types

// --- START: Database Connection Setup (Removed - db instance will be passed in) ---
// --- END: Database Connection Setup ---

interface DimDateRow {
  date_key: number;
  date_actual: Date;
  year_actual: number;
  quarter_actual: number;
  month_actual: number;
  day_actual: number;
  day_of_week: number; // 0 for Sunday, 1 for Monday ... 6 for Saturday
  day_name: string;
  month_name: string;
  is_weekend: boolean;
  iso_week_of_year: number;
}

const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // ISO day of week (Monday = 0, Sunday = 6)
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000); // 604800000 = 7 * 24 * 60 * 60 * 1000
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Renamed function and added db parameter
export async function seedDimDate(db: Kysely<any>, startYear: number = 2020, endYear: number = 2025): Promise<void> {
  console.log(`Populating DimDate from ${startYear} to ${endYear}...`);
  const datesToInsert: DimDateRow[] = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        
        const dateKey = parseInt(`${year}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`);
        const dayOfWeek = currentDate.getDay(); // Sunday is 0

        datesToInsert.push({
          date_key: dateKey,
          date_actual: currentDate,
          year_actual: year,
          quarter_actual: Math.floor(month / 3) + 1,
          month_actual: month + 1,
          day_actual: day,
          day_of_week: dayOfWeek,
          day_name: dayNames[dayOfWeek],
          month_name: monthNames[month],
          is_weekend: dayOfWeek === 0 || dayOfWeek === 6,
          iso_week_of_year: getWeekNumber(currentDate),
        });
      }
    }
  }

  if (datesToInsert.length === 0) {
    console.log("No dates to insert.");
    return;
  }

  try {
    // Optional: Clear existing data. If doing so, make sure it's what you intend.
    // await db.deleteFrom('data_warehouse.dim_date').execute();
    // console.log("Cleared existing data from data_warehouse.dim_date");

    // Batch insert for efficiency
    const chunkSize = 500; // Adjust based on your DB's limits and performance
    for (let i = 0; i < datesToInsert.length; i += chunkSize) {
      const chunk = datesToInsert.slice(i, i + chunkSize);
      await db
        .insertInto('data_warehouse.dim_date')
        .values(chunk)
        .onConflict(oc => oc.column('date_key').doNothing()) // Added onConflict to avoid issues on re-runs
        .execute();
      console.log(`Inserted/skipped chunk ${i / chunkSize + 1} into data_warehouse.dim_date`);
    }
    console.log(`Successfully populated data_warehouse.dim_date with ${datesToInsert.length} potential records.`);
  } catch (error) {
    console.error("Error populating DimDate:", error);
    // Re-throw the error so the calling script (run_all_dw_seeds) can handle it
    throw error;
  }
}

// --- Main execution (Removed - will be called by run_all_dw_seeds.ts) ---
// const START_YEAR = 2020; // Default start year
// const END_YEAR = 2025;   // Default end year

// populateDimDate(dbInstance, START_YEAR, END_YEAR) // dbInstance would need to be passed or imported
//   .then(() => console.log("DimDate population script finished."))
//   .catch(error => console.error("Script failed:", error))
//   .finally(async () => {
//     // await dbInstance.destroy(); // Handled by run_all_dw_seeds.ts
//   });
