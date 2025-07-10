init_dev: ## Initialise le projet en mode développement : crée le .env
	./init_dev.sh

start_dev: ## Démarre le projet en mode développement : construit les images et lance les containers
	./start_dev.sh

down_dev: ## Arrête les containers en mode développement
	docker compose -f ./server/docker-compose.yml down