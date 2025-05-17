# Use the official Bun image as base
FROM oven/bun:1 as builder


# Set working directory
WORKDIR /app


# Copy package files
COPY package.json bun.lock ./


# Install dependencies
RUN bun install --frozen-lockfile


# Copy source code
COPY . .


# Create a production build if needed (for typescript)
RUN bun build ./src/index.ts --outdir ./dist --target bun


# Start a new stage for a smaller production image
FROM oven/bun:1-slim


# Set working directory
WORKDIR /app


# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/kysely ./kysely


# Install only production dependencies
RUN bun install --frozen-lockfile --production


# Set environment variables
ENV NODE_ENV=production


# Expose the port the app runs on
EXPOSE 3333


# Command to run the app
CMD ["bun", "dist/index.js"]






