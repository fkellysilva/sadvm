
import { Pool } from "pg";
import { Kysely, CamelCasePlugin, DeduplicateJoinsPlugin, PostgresDialect } from "kysely";
import { DB } from "./types";

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
    })
})

export const db = new Kysely<DB>({
    dialect, plugins: [new CamelCasePlugin(), new DeduplicateJoinsPlugin()],
    log: ["query", "error"]
})