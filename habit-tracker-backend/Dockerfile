# ---------- build ----------
    FROM python:3.12-slim AS base
    WORKDIR /app
    
    ENV PYTHONDONTWRITEBYTECODE=1 \
        PYTHONUNBUFFERED=1
    
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    
    COPY ./entrypoint.sh /app/entrypoint.sh
    RUN chmod +x /app/entrypoint.sh

    COPY alembic.ini .

    COPY . .

    
    EXPOSE 8000
    
    CMD ["/app/entrypoint.sh"]
    