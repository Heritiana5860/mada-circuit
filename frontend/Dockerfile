# # Étape de construction
# FROM node:20.16.0-alpine AS development
# WORKDIR /app

# # Installation des dépendances nécessaires
# RUN apk add --no-cache p  python3 make g++

# # Copie des fichiers de configuration
# COPY package.json package-lock.json ./

# # Installation des dépendances avec le flag --platform
# RUN npm ci --platform=linux --arch=x64

# # Installation spécifique d'Axios et Vite
# RUN npm install axios vite --save

# # Copie du reste des fichiers du projet
# COPY . .

# # Construction de l'application
# RUN npm run build

# # Copie des fichiers et dépendances de l'étape de construction
# COPY --from=build /app ./

# # S'assurer que les binaires npm sont dans le PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # Installation des dépendances de développement si nécessaire
# RUN npm install

# # Exposition du port 5173
# EXPOSE 5173

# # Commande pour démarrer le serveur de développement
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# Étape unique de développement
FROM node:20.16.0-alpine AS development

# Définir le répertoire de travail
WORKDIR /app

# Dépendances système nécessaires
RUN apk add --no-cache python3 make g++

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances node
RUN npm ci

# Copier le reste du projet
COPY . .

# S'assurer que les binaires npm sont dans le PATH
ENV PATH /app/node_modules/.bin:$PATH

# Exposer le port du serveur de dev Vite
EXPOSE 5173

# Lancer le serveur de dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]