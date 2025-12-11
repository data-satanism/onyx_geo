#!/bin/bash

# Quick start script for Onyx development with full debug control
# This script helps set up and run all services

set -e

PROJECT_ROOT="/run/media/karl/really_big_HDD1/onyx_geo"
DOCKER_COMPOSE_DIR="$PROJECT_ROOT/deployment/docker_compose"
BACKEND_DIR="$PROJECT_ROOT/backend"
WEB_DIR="$PROJECT_ROOT/web"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed"
        exit 1
    fi
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1-2)
    if [[ "$PYTHON_VERSION" != "3.11" ]]; then
        print_warning "Python 3.11 is recommended, you have Python $PYTHON_VERSION"
    else
        print_success "Python 3.11 detected"
    fi
    
    # Check Node
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    print_success "Node.js $(node --version) detected"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker detected"
    
    # Check Docker daemon
    if ! docker ps &> /dev/null; then
        print_error "Docker daemon is not running"
        exit 1
    fi
    print_success "Docker daemon is running"
}

# Setup backend
setup_backend() {
    print_header "Setting Up Backend"
    
    cd "$BACKEND_DIR"
    
    # Check if venv exists
    if [ ! -d ".venv" ]; then
        print_warning "Virtual environment not found, creating..."
        uv venv .venv --python 3.11
        print_success "Virtual environment created"
    fi
    
    # Activate venv
    source .venv/bin/activate
    
    # Install dependencies
    print_warning "Installing dependencies (this may take a while)..."
    uv sync --all-extras > /dev/null 2>&1
    print_success "Dependencies installed"
    
    # Install Playwright
    print_warning "Installing Playwright (this may take a while)..."
    uv run playwright install > /dev/null 2>&1
    print_success "Playwright installed"
}

# Setup frontend
setup_frontend() {
    print_header "Setting Up Frontend"
    
    cd "$WEB_DIR"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_warning "Node modules not found, installing..."
        npm install > /dev/null 2>&1
        print_success "Node modules installed"
    else
        print_success "Node modules already installed"
    fi
}

# Start Docker services
start_docker() {
    print_header "Starting Docker Services"
    
    cd "$DOCKER_COMPOSE_DIR"
    
    # Check if services are already running
    if docker compose ps | grep -q "index\|relational_db\|cache\|minio"; then
        print_warning "Some Docker services are already running"
    else
        print_warning "Starting Docker services (index, relational_db, cache, minio)..."
        docker compose up -d index relational_db cache minio
        print_success "Docker services started"
        
        # Wait for services to be ready
        print_warning "Waiting for services to be ready (30 seconds)..."
        sleep 30
    fi
}

# Run database migrations
run_migrations() {
    print_header "Running Database Migrations"
    
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    
    print_warning "Running migrations..."
    alembic upgrade head
    print_success "Database migrations completed"
}

# Show instructions
show_instructions() {
    print_header "Setup Complete! 🎉"
    
    echo -e "${GREEN}All services are ready to start!${NC}\n"
    
    echo -e "${BLUE}Start the services in separate terminals:${NC}\n"
    
    echo "1. Model Server:"
    echo "   cd $BACKEND_DIR && source .venv/bin/activate"
    echo "   uvicorn model_server.main:app --reload --port 9000\n"
    
    echo "2. Background Jobs:"
    echo "   cd $BACKEND_DIR && source .venv/bin/activate"
    echo "   python ./scripts/dev_run_background_jobs.py\n"
    
    echo "3. Backend API:"
    echo "   cd $BACKEND_DIR && source .venv/bin/activate"
    echo "   AUTH_TYPE=disabled uvicorn onyx.main:app --reload --port 8080\n"
    
    echo "4. Frontend:"
    echo "   cd $WEB_DIR && nvm use 22"
    echo "   npm run dev\n"
    
    echo -e "${GREEN}Then open:${NC} http://localhost:3000\n"
    
    echo -e "${YELLOW}To stop all services:${NC}"
    echo "   docker compose -f $DOCKER_COMPOSE_DIR/docker-compose.yml down\n"
}

# Main execution
main() {
    echo -e "${BLUE}Onyx Development Setup${NC}"
    echo "========================"
    
    check_prerequisites
    setup_backend
    setup_frontend
    start_docker
    run_migrations
    show_instructions
}

main
