# Starts server in development mode
dev:
	docker-compose up

# Installs dependencies
install:
	docker-compose -f docker-compose.helper.yml run --rm install

# Watches for changes and compiles Tpescript to production code
tsc-watch:
	docker-compose -f docker-compose.helper.yml run --rm tsc-watch

# Shuts down all unused docker containers
down:
	docker-compose down --remove-orphans

# Lists all ative docker containers
containers:
	docker container ls