# -------------------- ÉTAPE 1: CONSTRUCTION (BUILD) --------------------
# Utilisation de l'image Eclipse Temurin 17 (JDK Alpine)
FROM eclipse-temurin:17-jdk-alpine AS build 
WORKDIR /app
# Copie le fichier JAR compilé 
COPY target/productservice-0.0.1-SNAPSHOT.jar app.jar 

# -------------------- ÉTAPE 2: EXÉCUTION (RUN) --------------------
# Utilisation de l'image Eclipse Temurin 17 (JRE Alpine) pour l'exécution finale.
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copie le JAR FINAL depuis l'étape de construction (build)
COPY --from=build /app/app.jar .
# Le port d'écoute par défaut de Spring Boot
EXPOSE 8080
# Commande de démarrage
ENTRYPOINT ["java", "-jar", "app.jar"]