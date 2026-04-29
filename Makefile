


prod.pull:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env pull

prod.up:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env up -d --force-recreate

prod.build-up:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env up -d --force-recreate --build

prod.pull-build-up: prod.pull prod.build-up

prod.down:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env down
