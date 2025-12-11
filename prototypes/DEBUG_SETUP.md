# Running Onyx Backend & Frontend in Terminal (Debug Mode)

This guide explains how to run the Onyx system with full control for debugging purposes.

## Prerequisites

- Python 3.11
- Node.js 22.x (use `nvm install 22 && nvm use 22`)
- Docker installed and running
- Virtual environment set up with dependencies

## Step 1: Setup Virtual Environment (First Time Only)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

# Create virtual environment
uv venv .venv --python 3.11

# Activate it
source .venv/bin/activate

# Install dependencies
uv sync --all-extras

# Install Playwright for web connector
uv run playwright install
```

## Step 2: Start External Services (Docker Containers)

These containers provide the external dependencies needed (Postgres, Vespa, Redis, MinIO).

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/deployment/docker_compose

# Start only the infrastructure services (NOT the full Onyx stack)
docker compose up -d index relational_db cache minio
```

**Services started:**
- `index` → Vespa (Vector DB/Search Engine) - Port 8081
- `relational_db` → PostgreSQL (Relational DB) - Port 5432
- `cache` → Redis (Cache) - Port 6379
- `minio` → MinIO (File Store) - Port 9000

**To stop these services:**
```bash
docker compose down
```

**To view logs:**
```bash
docker compose logs -f index relational_db cache minio
```

## Step 3: Run Backend Services in Separate Terminals

### 3.1 Database Migrations (First Time Only)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

# Activate venv if not already activated
source .venv/bin/activate

# Run migrations
alembic upgrade head
```

### 3.2 Model Server (Terminal 1)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

source .venv/bin/activate

uvicorn model_server.main:app --reload --port 9000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:9000
INFO:     Application startup complete
```

### 3.3 Background Jobs (Terminal 2)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

source .venv/bin/activate

python ./scripts/dev_run_background_jobs.py
```

**Expected output:**
```
INFO:     Background job scheduler started
```

### 3.4 Backend API Server (Terminal 3)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

source .venv/bin/activate

AUTH_TYPE=disabled uvicorn onyx.main:app --reload --port 8080
```

**With debug logging (optional):**
```bash
AUTH_TYPE=disabled LOG_LEVEL=DEBUG uvicorn onyx.main:app --reload --port 8080
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8080
INFO:     Application startup complete
```

## Step 4: Run Frontend Server in Separate Terminal (Terminal 4)

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/web

# Ensure Node 22 is active
nvm use 22

npm run dev
```

**Expected output:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

## Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Onyx onboarding wizard.

## Summary: Running Services

| Service | Terminal | Command | Port |
|---------|----------|---------|------|
| Docker Containers | Main | `docker compose up -d index relational_db cache minio` | - |
| Model Server | 1 | `uvicorn model_server.main:app --reload --port 9000` | 9000 |
| Background Jobs | 2 | `python ./scripts/dev_run_background_jobs.py` | - |
| Backend API | 3 | `AUTH_TYPE=disabled uvicorn onyx.main:app --reload --port 8080` | 8080 |
| Frontend | 4 | `npm run dev` | 3000 |

## Docker Containers to Stop

If you already have other Onyx containers running, stop them first:

```bash
# Stop all Onyx containers
docker compose down

# Or stop specific containers
docker stop onyx_web onyx_backend onyx_nginx
```

To see all running containers:
```bash
docker ps
```

To stop a specific container:
```bash
docker stop <container_id>
```

## Debugging Tips

### 1. Backend API Debugging

Add breakpoints in your Python code and use debugging tools:

```python
import pdb
pdb.set_trace()  # Add this to break execution
```

Or use Python logging:
```bash
AUTH_TYPE=disabled LOG_LEVEL=DEBUG uvicorn onyx.main:app --reload --port 8080
```

### 2. Frontend Debugging

Use browser DevTools (F12 or Cmd+Option+I) to inspect:
- Network requests to `http://localhost:8080`
- Console for JavaScript errors
- React DevTools browser extension

### 3. View Service Logs

Each terminal shows real-time logs. For Docker containers:
```bash
docker compose logs -f relational_db
docker compose logs -f cache
docker compose logs -f index
```

### 4. Check Database

Access PostgreSQL:
```bash
docker exec -it onyx_relational_db psql -U postgres
```

### 5. Reset All Data

```bash
# Stop containers
docker compose down

# Remove volumes (WARNING: deletes all data)
docker compose down -v

# Restart
docker compose up -d index relational_db cache minio

# Re-run migrations
cd /run/media/karl/really_big_HDD1/onyx_geo/backend && alembic upgrade head
```

## Environment Variables

Create `.env` in `backend/` if needed:

```bash
cd /run/media/karl/really_big_HDD1/onyx_geo/backend

cat > .env << 'EOF'
AUTH_TYPE=disabled
LOG_LEVEL=DEBUG
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=onyx
REDIS_URL=redis://localhost:6379
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
EOF
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port (e.g., 8080)
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Virtual Environment Not Activated
```bash
# Check if activated (should show (.venv) in prompt)
which python

# If not, activate:
cd backend && source .venv/bin/activate
```

### Dependencies Missing
```bash
cd backend && uv sync --all-extras
```

### Docker Services Won't Start
```bash
# Check Docker daemon
docker ps

# View container logs
docker compose logs index relational_db cache minio

# Rebuild containers
docker compose up -d --build index relational_db cache minio
```

---

**Happy debugging! 🐛**
