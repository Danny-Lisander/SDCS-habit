<<<<<<< HEAD
# SDCS Habit Tracker - Docker Deployment

This project is a containerized setup for the SDCS Habit Tracker app, featuring:

- FastAPI backend (Python)
- PostgreSQL database (internal or external on Azure)
- React frontend (served via NGINX)
- Docker Swarm-compatible stack

## 🔧 Project Structure

```
.
├── docker-compose.yml      # Docker Swarm-compatible configuration
├── .env.example            # Environment variable template
├── nginx/
│   └── nginx.conf          # NGINX proxy and SPA fallback config
├── habit-tracker-backend/
│   ├── entrypoint.sh       # Runs Alembic migrations + Uvicorn
│   ├── Dockerfile          # Backend container
├── habit-tracker-frontend/
│   └── Dockerfile          # Frontend build + nginx container
```

---

## 🚀 Running the App

### 1. Copy environment file and customize it

```bash
cp .env.example .env
```

If you're using **local PostgreSQL container** (default):
```env
USE_EXTERNAL_DB=0
DATABASE_URL=postgresql://habit:secret@postgres/habitdb
```

If you're using **Azure-hosted PostgreSQL**:
```env
USE_EXTERNAL_DB=1
DATABASE_URL=postgresql://admin:secret@mydb.postgres.database.azure.com/habitdb
```

### 2. Start the system

**Local Docker Compose:**

```bash
docker compose up --build -d
```

**Docker Swarm Cluster:**

```bash
docker stack deploy -c docker-compose.yml habit
docker service ls
```

---

## 🛠 Failover & Resilience Testing

- App runs with **2 replicas per service** (backend/frontend)
- Simulate backend failover:

```bash
docker service ps habit_backend
docker container kill <task-id>
```

Check that system **re-routes traffic** and restores failed replicas automatically.

---

## 🌐 Access the App

Visit: [http://localhost](http://localhost)  
Health check endpoint: `/api/health`

---

## 🧪 Bonus: Azure PostgreSQL (PaaS)

- Create Azure PostgreSQL flexible server
- Add your VM's public IP to the server's firewall
- Use the provided `DATABASE_URL` in `.env`

---

## 📝 License

This project is provided for educational/demo purposes. MIT or BSD license recommended.
=======
# SDCS-habit
# Daniil its your turn
>>>>>>> 9f70608780d5bd17b2a225ad795342afdc158593
