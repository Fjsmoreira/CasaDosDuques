FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache python3
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["python3", "-m", "http.server", "80", "-d", "/app/dist/", "--bind", "0.0.0.0"]
