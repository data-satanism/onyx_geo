#!/bin/bash

# Quick reference for running Onyx services
# Usage: ./start_services.sh [service]
# Or run without arguments to see all services

PROJECT_ROOT="/run/media/karl/really_big_HDD1/onyx_geo"
BACKEND_DIR="$PROJECT_ROOT/backend"
WEB_DIR="$PROJECT_ROOT/web"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_help() {
    cat << EOF
${BLUE}Onyx Service Runner${NC}

Usage: $0 [service]

Services:
  ${GREEN}docker${NC}        - Start Docker infrastructure (index, relational_db, cache, minio)
  ${GREEN}backend${NC}       - Start backend API on port 8080
  ${GREEN}models${NC}        - Start model server on port 9000
  ${GREEN}jobs${NC}          - Start background job scheduler
  ${GREEN}frontend${NC}      - Start Next.js web server on port 3000
  ${GREEN}all${NC}           - Print all commands to run in separate terminals
  ${GREEN}stop${NC}          - Stop Docker containers
  ${GREEN}logs${NC}          - Show Docker container logs

Examples:
  $0 docker        # Start Docker services
  $0 backend       # Start backend API
  $0 all           # Show all commands
  $0 stop          # Stop Docker containers

EOF
}

start_docker() {
    echo -e "${YELLOW}Starting Docker services...${NC}"
    cd "$PROJECT_ROOT/deployment/docker_compose"
    docker compose up -d index relational_db cache minio
    echo -e "${GREEN}✓ Docker services started${NC}"
    echo -e "  - Vespa (index):     http://localhost:8081"
    echo -e "  - PostgreSQL:        localhost:5432"
    echo -e "  - Redis:             localhost:6379"
    echo -e "  - MinIO:             http://localhost:9000"
}

stop_docker() {
    echo -e "${YELLOW}Stopping Docker services...${NC}"
    cd "$PROJECT_ROOT/deployment/docker_compose"
    docker compose down
    echo -e "${GREEN}✓ Docker services stopped${NC}"
}

logs_docker() {
    echo -e "${YELLOW}Showing Docker logs (press Ctrl+C to exit)...${NC}"
    cd "$PROJECT_ROOT/deployment/docker_compose"
    docker compose logs -f index relational_db cache minio
}

start_backend() {
    echo -e "${YELLOW}Starting Backend API...${NC}"
    echo -e "${BLUE}Running on: http://localhost:8080${NC}"
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    AUTH_TYPE=disabled uvicorn onyx.main:app --reload --port 8080
}

start_models() {
    echo -e "${YELLOW}Starting Model Server...${NC}"
    echo -e "${BLUE}Running on: http://localhost:9000${NC}"
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    uvicorn model_server.main:app --reload --port 9000
}

start_jobs() {
    echo -e "${YELLOW}Starting Background Jobs...${NC}"
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    python ./scripts/dev_run_background_jobs.py
}

start_frontend() {
    echo -e "${YELLOW}Starting Next.js Frontend...${NC}"
    echo -e "${BLUE}Running on: http://localhost:3000${NC}"
    cd "$WEB_DIR"
    nvm use 22 2>/dev/null || echo "Warning: nvm not found, ensuring Node 22 is active"
    npm run dev
}

show_all() {
    cat << EOF
${BLUE}=== Running All Onyx Services ===${NC}

${YELLOW}Step 1: Start Docker Infrastructure${NC}
   cd $PROJECT_ROOT/deployment/docker_compose
   docker compose up -d index relational_db cache minio

${YELLOW}Step 2: In Terminal 1 - Start Model Server${NC}
   cd $BACKEND_DIR && source .venv/bin/activate
   uvicorn model_server.main:app --reload --port 9000

${YELLOW}Step 3: In Terminal 2 - Start Background Jobs${NC}
   cd $BACKEND_DIR && source .venv/bin/activate
   python ./scripts/dev_run_background_jobs.py

${YELLOW}Step 4: In Terminal 3 - Start Backend API${NC}
   cd $BACKEND_DIR && source .venv/bin/activate
   AUTH_TYPE=disabled uvicorn onyx.main:app --reload --port 8080

${YELLOW}Step 5: In Terminal 4 - Start Frontend${NC}
   cd $WEB_DIR && nvm use 22
   npm run dev

${GREEN}Then open in browser:${NC} http://localhost:3000

${YELLOW}To stop everything:${NC}
   docker compose -f $PROJECT_ROOT/deployment/docker_compose/docker-compose.yml down

EOF
}

# Main
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

case "$1" in
    docker)
        start_docker
        ;;
    backend)
        start_backend
        ;;
    models)
        start_models
        ;;
    jobs)
        start_jobs
        ;;
    frontend)
        start_frontend
        ;;
    all)
        show_all
        ;;
    stop)
        stop_docker
        ;;
    logs)
        logs_docker
        ;;
    help|-h|--help)
        show_help
        ;;
    *)
        echo -e "${YELLOW}Unknown service: $1${NC}"
        show_help
        exit 1
        ;;
esac
