# ==========================================
# SoccerMatrix AI - Multi-Stage Dockerfile
# ==========================================

# Stage 1: Build & Bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source code and build config
COPY . .

# Compile Vite frontend to dist/ and bundle Express backend to dist/server.cjs
RUN npm run build

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

# Copy compiled assets from builder
COPY --from=builder /app/dist ./dist

# Use non-root node user for container security
USER node

# Expose web server port
EXPOSE 3000

# Container Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Start compiled server
CMD ["node", "dist/server.cjs"]
