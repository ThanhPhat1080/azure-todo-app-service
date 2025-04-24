# Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build
RUN ls -la dist/  # Debug: Check if build files exist

# Build and run backend
FROM node:20-alpine
WORKDIR /app

# Create client/build directory
RUN mkdir -p client/build

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist/ ./client/build/
RUN ls -la client/build/  # Debug: Check if files were copied

# Setup backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy backend source
COPY backend/ .

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

EXPOSE 5000
CMD ["node", "index.js"]
