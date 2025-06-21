build-app-dev:
	docker compose -f docker-compose.dev.yml build --d app
app-dev:
	docker compose -f docker-compose.dev.yml up --d app
down-dev:
	docker compose -f docker-compose.dev.yml down

.PHONY: build-app-dev app-dev down-dev
