FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npm run prisma:generate

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"] 