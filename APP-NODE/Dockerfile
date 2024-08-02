# Etapa para instalar todas las dependencias, incluidas devDependencies
# FROM node:20.9.0-alpine as dev-deps
# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# # Etapa para ejecutar pruebas
# FROM dev-deps as test
# WORKDIR /app
# COPY . .
# RUN npm test

FROM node:20.9.0-alpine as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod

FROM node:20.9.0-alpine as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "dev" ]