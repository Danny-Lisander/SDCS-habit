# ---------- build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY habit-tracker-frontend/package*.json ./
    RUN npm ci
    COPY habit-tracker-frontend/ .
    RUN npm run build
    
    # ---------- serve ----------
    FROM nginx:1.27-alpine
    COPY nginx/nginx.conf /etc/nginx/nginx.conf
    COPY --from=build /app/build /usr/share/nginx/html
    HEALTHCHECK CMD curl --fail http://localhost || exit 1
    