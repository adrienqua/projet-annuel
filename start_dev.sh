# Charge les variables d'environnement
set -a
. server/.env
set +a

# Initialisation de la base de données
cd server || exit
docker compose -f docker-compose.yml up -d --build --remove-orphans
if [ $? -ne 0 ]; then
    echo "Échec de l'initialisation de Docker."
    exit 1
fi
echo "Projet initialisé avec succès."