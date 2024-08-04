FROM node:20.9.0-alpine as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20.9.0-alpine as prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20.9.0-alpine as prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD [ "node", "src/app.js" ] 
