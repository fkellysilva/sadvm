import { promises as fs } from "node:fs";
import * as path from "node:path";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "../database/db";
import logger from "./logger";


async function migrateToLatest() {
    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(process.cwd(), "kysely", "migrations"),
        }),
    });


    const { error, results } = await migrator.migrateToLatest();


    if (results) {
        for (const migration of results) {
            if (migration.status === "Success") {
                logger.info(`migration "${migration.migrationName}" was executed successfully`);
            } else if (migration.status === "Error") {
                logger.error(`failed to execute migration "${migration.migrationName}"`);
            }
        }
    }


    if (error) {
        logger.error("failed to migrate");
        logger.error(error);
        process.exit(1);
    }
}


export { migrateToLatest };




