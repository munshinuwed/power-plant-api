# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./



RUN npm install

COPY . .

# Build TypeScript
RUN npm run build

# Install only production dependencies
FROM gcr.io/distroless/nodejs22

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/docs ./docs

# If you use .env files, copy them or set ENV directly

EXPOSE 3000
# Use direct node call, since distroless has no shell!
CMD ["dist/server.js"]
