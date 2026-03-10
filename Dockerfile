# Node.js LTS
FROM node:22-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande par défaut
CMD ["npm", "start"]
