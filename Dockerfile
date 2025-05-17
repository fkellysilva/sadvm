# Use an official Bun runtime as a parent image
FROM oven/bun:1 AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and bun.lock
# Install dependencies first to leverage Docker cache
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Bun automatically exposes port 3000 by default with Elysia
# If your app uses a different port, change it here
EXPOSE 3333

# Define the command to run the app
CMD ["bun", "run", "src/index.ts"] 