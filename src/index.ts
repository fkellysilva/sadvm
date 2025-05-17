import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { migrateToLatest } from "./common/utils/migrator";
import { logger } from "@bogeychan/elysia-logger";
import { env } from "./common/utils/env";

await migrateToLatest()

const app = new Elysia()
  .use(logger({
    level: env.get("LOG_LEVEL")
  }))
  .use(swagger({
    path: 'docs'
  }))
  .get("/", () => "Hello Elysia")
  .listen(env.get("PORT"));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
