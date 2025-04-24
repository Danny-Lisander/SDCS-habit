# ---------- build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build    
    # ---------- serve ----------
    FROM nginx:1.27-alpine
    COPY nginx.conf /etc/nginx/nginx.conf
    COPY --from=build /app/build /usr/share/nginx/html
    HEALTHCHECK CMD curl --fail http://localhost || exit 1
    