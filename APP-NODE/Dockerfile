# Etapa para instalar todas las dependencias, incluidas devDependencies
FROM node:20.9.0-alpine as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Etapa para ejecutar pruebas
# FROM dev-deps as test
# WORKDIR /app
# COPY . .
# RUN npm test

# Etapa para producción
FROM node:20.9.0-alpine as prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20.9.0-alpine as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD [ "node", "src/app.js" ]  # O el archivo principal de tu aplicación en producción
