#!/usr/bin/env bash
set -euo pipefail

# rebuild_and_up.sh - rebuild the web UI image and start docker compose
# Usage:
#   ./rebuild_and_up.sh [--files "-f file1 -f file2"] [services...]
# Examples:
#   ./rebuild_and_up.sh                # build web_server, then up all services from docker-compose.yml
#   ./rebuild_and_up.sh web_server     # build web_server, then up only web_server
#   ./rebuild_and_up.sh --files "-f docker-compose.yml -f docker-compose.dev.yml" up

# Defaults
COMPOSE_DIR="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILES=("-f" "docker-compose.yml")
BUILD_SERVICES=("web_server")
UP_SERVICES=()

# parse optional --files and remaining args (services to bring up)
if [ "$#" -gt 0 ]; then
  # handle --files argument
  while (("$#")); do
    case "$1" in
      --files)
        shift
        if [ -z "${1-}" ]; then
          echo "--files requires a value like \"-f docker-compose.yml -f docker-compose.dev.yml\""
          exit 1
        fi
        # split into array
        read -r -a parts <<< "$1"
        COMPOSE_FILES=()
        for p in "${parts[@]}"; do
          COMPOSE_FILES+=("$p")
        done
        shift
        ;;
      up)
        shift
        # remaining are services
        UP_SERVICES=("$@")
        break
        ;;
      *)
        UP_SERVICES+=("$1")
        shift
        ;;
    esac
  done
fi

# if no explicit up services provided, we'll up all
# But we always rebuild the web_server image first

echo "Using compose files: ${COMPOSE_FILES[*]}"

echo "Rebuilding web UI image(s): ${BUILD_SERVICES[*]}"
# run build with no-cache to ensure rebuild
( cd "$COMPOSE_DIR" && docker compose "${COMPOSE_FILES[@]}" build --no-cache "${BUILD_SERVICES[@]}" )

echo "Starting compose stack"
if [ ${#UP_SERVICES[@]} -eq 0 ]; then
  ( cd "$COMPOSE_DIR" && docker compose "${COMPOSE_FILES[@]}" up -d )
else
  ( cd "$COMPOSE_DIR" && docker compose "${COMPOSE_FILES[@]}" up -d "${UP_SERVICES[@]}" )
fi

echo "Done."
