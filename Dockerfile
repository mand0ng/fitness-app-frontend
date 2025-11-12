# Build stage
FROM node:25-alpine AS builder

# Install required dependencies for native modules
# For turbopack support
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

WORKDIR /app
COPY package*.json ./
COPY yarn.lock* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:25-alpine AS production

# Install required dependencies for runtime
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]