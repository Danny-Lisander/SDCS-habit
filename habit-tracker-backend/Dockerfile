# ---------- build ----------
    FROM python:3.12-slim AS base
    WORKDIR /app
    
    ENV PYTHONDONTWRITEBYTECODE=1 \
        PYTHONUNBUFFERED=1
    
    COPY habit-tracker-backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    COPY habit-tracker-backend/ .
    RUN chmod +x entrypoint.sh
    
    EXPOSE 8000
    HEALTHCHECK CMD curl --fail http://localhost:8000/health || exit 1
    
    CMD ["./entrypoint.sh"]
    