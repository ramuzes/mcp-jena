FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy source code and build configuration
COPY tsconfig.json ./
COPY scripts ./scripts
COPY src ./src

# Build the application
RUN npm run build

FROM node:20-alpine AS release

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.npm-production npm ci --ignore-scripts --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Environment variables
ENV JENA_FUSEKI_URL=http://fuseki:3030
ENV DEFAULT_DATASET=ds

# Expose the MCP server - adjust port if needed
# Note: MCP server uses stdin/stdout by default, not TCP ports

# Set entrypoint
ENTRYPOINT ["node", "dist/index.js"]

# Optionally, you can add command line arguments here
# CMD ["--endpoint", "http://fuseki:3030", "--dataset", "ds"] 