#!/bin/bash

# Vérifie si le .env existe, le crée sinon
if [ ! -f server/.env ]; then
    echo "Configuration des variables d'environnement Docker"
    read -p "Nom d'utilisateur de la base de données : " DB_USER
    read -sp "Mot de passe de la base de données : " DB_PASSWORD
    read -p "Nom de la base de données : " DB_NAME
    read -p "Port d'ouverture de la base de données PostgreSQL : " DB_PORT
    read -p "Port d'ouverture de l'application front : " FRONT_PORT
    read -p "Port d'ouverture de l'application back : " SERVER_PORT

    echo "Création du fichier .env..."
    cp server/.env.dev.dist server/.env
    if [ $? -ne 0 ]; then
        echo "Échec de la création du fichier .env."
        exit 1
    fi
    sed -i "s/DOCKER_POSTGRES_USER=/DOCKER_POSTGRES_USER=${DB_USER}/g" server/.env
    sed -i "s/DOCKER_POSTGRES_PASSWORD=/DOCKER_POSTGRES_PASSWORD=${DB_PASSWORD}/g" server/.env
    sed -i "s/DOCKER_POSTGRES_DB=/DOCKER_POSTGRES_DB=${DB_NAME}/g" server/.env
    sed -i "s/DOCKER_POSTGRES_PORT=/DOCKER_POSTGRES_PORT=${DB_PORT}/g" server/.env
    sed -i "s/DOCKER_FRONT_PORT=/DOCKER_FRONT_PORT=${FRONT_PORT}/g" server/.env
    sed -i "s/DOCKER_SERVER_PORT=/DOCKER_SERVER_PORT=${SERVER_PORT}/g" server/.env

    echo "Fichier .env créé avec succès."
fi