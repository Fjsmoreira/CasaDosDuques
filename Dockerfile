FROM node:22-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source and build
COPY . .
RUN npm run build

# Create data directory for leads
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "server.js"]
