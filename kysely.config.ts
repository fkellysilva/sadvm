import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl'
import { db } from './src/common/database/db'

export default defineConfig({
    kysely: db,
    migrations: {
        migrationFolder: 'kysely/migrations',
        getMigrationPrefix: getKnexTimestampPrefix
    }
})
