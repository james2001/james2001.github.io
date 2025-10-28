# Node.js version compatible avec React 18
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY yarn.lock ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande par défaut
CMD ["npm", "start"]
