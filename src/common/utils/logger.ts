import { createPinoLogger } from "@bogeychan/elysia-logger";
import { env } from "./env";


const logger = createPinoLogger({
    level: env.get("LOG_LEVEL"),
    transport:
        env.get("NODE_ENV") !== "production"
            ? {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                },
            }
            : undefined,
});


export default logger;


// Re-export specific methods for convenience
export const trace = logger.trace.bind(logger);
export const debug = logger.debug.bind(logger);
export const info = logger.info.bind(logger);
export const warn = logger.warn.bind(logger);
export const error = logger.error.bind(logger);
export const fatal = logger.fatal.bind(logger);


// Additional Pino utility methods
export const child = logger.child.bind(logger);
export const bindings = logger.bindings.bind(logger);
export const flush = logger.flush?.bind(logger);
export const level = logger.level;
export const levels = logger.levels;
export const isLevelEnabled = logger.isLevelEnabled.bind(logger);
export const version = logger.version;


// TypeScript type export for the logger
export type Logger = typeof logger;




