# -------------------- ÉTAPE 1: CONSTRUCTION (BUILD) --------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Correction de la syntaxe de compilation Angular
RUN npm run build -- --output-path=./dist --configuration=production --base-href / 

# -------------------- ÉTAPE 2: EXÉCUTION (RUN) --------------------
FROM nginx:alpine

# Copie la configuration Nginx (pour les routes Angular)
# Nous remplaçons la configuration principale de Nginx pour éviter les conflits.
COPY nginx/nginx.conf /etc/nginx/nginx.conf 

# LIGNE CRITIQUE : Copie le contenu du dossier 'browser' vers le répertoire Nginx
COPY --from=build /app/dist/browser/. /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]