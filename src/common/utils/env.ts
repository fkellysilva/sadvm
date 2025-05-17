import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("3333").transform(Number),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string(),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
})

export type Env = z.infer<typeof envSchema>;

const validatedEnv: Env = envSchema.parse(process.env)

export const env = {
    get: <K extends keyof Env>(key: K): (typeof validatedEnv)[K] => validatedEnv[key],
}