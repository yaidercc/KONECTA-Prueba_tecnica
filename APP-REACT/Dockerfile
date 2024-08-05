# Etapa de desarrollo y dependencias
FROM node:20.9.0-alpine as dev-deps
WORKDIR /app
ENV PATH /usr/src/node_modules/.bin:$PATH
COPY package.json package.json
RUN npm install

# Etapa de construcción
FROM node:20.9.0-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p /app/public   
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=dev-deps /app/node_modules ./node_modules
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
