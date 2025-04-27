# Etapa 1: compilación de TypeScript
FROM node:22 AS build

WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila el código TypeScript
RUN npm run build

# Etapa 2: solo los archivos necesarios para correr
FROM node:22

WORKDIR /app

# Instala solo las dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copia la carpeta de build desde la etapa anterior
COPY --from=build /app/dist ./dist
COPY .env .env

CMD ["node", "dist/server.js"]
