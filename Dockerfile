FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache nodejs supervisor

# Copy app
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js /app/scripts/mailer.js /app/run-api.sh ./
RUN chmod +x /app/run-api.sh

# Copy static site
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copy configs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisord.conf

VOLUME /data

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
