FROM node:22-alpine
RUN apk add --no-cache nginx
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
RUN cp -r /app/dist/* /usr/share/nginx/html/ && \
    cp /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
