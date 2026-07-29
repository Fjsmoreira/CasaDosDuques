FROM node:22-alpine
WORKDIR /app

# Install all dependencies (sharp is needed for the Astro build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Prune dev dependencies after build for a smaller image
RUN npm prune --omit=dev

# Create data directory for leads
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "server.js"]
