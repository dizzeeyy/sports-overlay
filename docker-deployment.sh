#!/bin/bash
set -e

CLIENT_DOMAIN="$1"      # np. klient1.com
CLIENT_NAME="$2"        # np. Klient Jeden
JWT_SECRET="$3"         # sekret JWT dla klienta
APP_PORT="$4"           # np. 4001
DB_PORT="$5"            # np. 5433

DEPLOY_DIR="deployments/$CLIENT_NAME"
TEMPLATE_DIR="template"
VOLUME_NAME="pg_data_${CLIENT_NAME//[^a-zA-Z0-9]/_}"

# Tworzymy folder wdrożenia
mkdir -p "$DEPLOY_DIR/volumes"

# Kopiujemy pliki szablonu
cp "$TEMPLATE_DIR/docker-compose.yml" "$DEPLOY_DIR/docker-compose.yml"
cp "$TEMPLATE_DIR/.env.example" "$DEPLOY_DIR/.env"
cp "$TEMPLATE_DIR/Dockerfile" "$DEPLOY_DIR/Dockerfile"


# Podmieniamy zmienne w .env
SAFE_CLIENT_NAME=$(printf '%s\n' "$CLIENT_NAME" | sed 's/[\/&]/\\&/g')
sed -i '' "s|CLIENT_NAME_PLACEHOLDER|$SAFE_CLIENT_NAME|g" "$DEPLOY_DIR/.env"
sed -i '' "s|VOLUME_NAME_PLACEHOLDER|$VOLUME_NAME|g" "$DEPLOY_DIR/.env"
sed -i '' "s/JWT_SECRET_PLACEHOLDER/$JWT_SECRET/g" "$DEPLOY_DIR/.env"
sed -i '' "s/DB_NAME_PLACEHOLDER/db_${CLIENT_NAME//[^a-zA-Z0-9]/_}/g" "$DEPLOY_DIR/.env"
sed -i '' "s/APP_PORT_PLACEHOLDER/$APP_PORT/g" "$DEPLOY_DIR/.env"
sed -i '' "s/DB_PORT_PLACEHOLDER/$DB_PORT/g" "$DEPLOY_DIR/.env"

# Podmiana zmiennych w docker-compose.yml
sed -i '' "s|VOLUME_NAME_PLACEHOLDER|$VOLUME_NAME|g" "$DEPLOY_DIR/docker-compose.yml"
sed -i '' "s|CLIENT_NAME_PLACEHOLDER|$CLIENT_NAME|g" "$DEPLOY_DIR/docker-compose.yml"


# Przechodzimy do katalogu wdrożenia i uruchamiamy
cd "$DEPLOY_DIR"
docker compose build --no-cache
docker compose up -d db

# Wczytujemy zmienne z .env do zmiennych shell
export $(grep -v '^#' .env | xargs)

# Czekamy, aż baza będzie dostępna i utworzymy bazę, jeśli nie istnieje
echo "Sprawdzam i tworzę bazę danych jeśli nie istnieje..."

until docker exec -i $(docker ps -qf "name=db") pg_isready -U "$POSTGRES_USER" > /dev/null 2>&1; do
  echo "Czekam na bazę danych..."
  sleep 2
done

EXISTS=$(docker exec -i $(docker ps -qf "name=db") psql -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_DB'")

if [ "$EXISTS" != "1" ]; then
  echo "Baza $POSTGRES_DB nie istnieje, tworzę..."
  docker exec -i $(docker ps -qf "name=db") psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE $POSTGRES_DB;"
else
  echo "Baza $POSTGRES_DB już istnieje."
fi

# Uruchamiamy pełen stack (app + db)
docker compose up -d app

echo "Instancja klienta $CLIENT_NAME ($CLIENT_DOMAIN) uruchomiona na portach app:$APP_PORT, db:$DB_PORT"
