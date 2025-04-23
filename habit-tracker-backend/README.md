# Habit Tracker API

Backend API для приложения по отслеживанию привычек, построенный на FastAPI и PostgreSQL.

## Функциональность

- Регистрация и аутентификация пользователей
- Создание, чтение, обновление и удаление привычек
- Приватные привычки для каждого пользователя
- JWT-аутентификация

## Установка

1. Создайте виртуальное окружение:

```bash
python -m venv venv
source venv/bin/activate  # для Linux/Mac
venv\Scripts\activate     # для Windows
```

2. Установите зависимости:

```bash
pip install -r requirements.txt
```

3. Создайте файл `.env` в корневой директории проекта и добавьте в него:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/habit_tracker
SECRET_KEY=your-secret-key-here  # Сгенерируйте безопасный ключ
```

4. Создайте базу данных PostgreSQL:

```bash
createdb habit_tracker
```

5. Примените миграции:

```bash
alembic upgrade head
```

## Работа с миграциями

### Создание новой миграции

```bash
alembic revision --autogenerate -m "описание изменений"
```

### Применение миграций

```bash
alembic upgrade head
```

### Откат миграций

```bash
alembic downgrade -1  # откат на одну миграцию назад
alembic downgrade base  # откат всех миграций
```

### Просмотр текущей версии

```bash
alembic current
```

### Просмотр истории миграций

```bash
alembic history
```

## Запуск

1. Запустите сервер:

```bash
uvicorn main:app --reload
```

2. Откройте документацию API:

```
http://localhost:8000/docs
```

## API Endpoints

### Аутентификация

- `POST /register/` - Регистрация нового пользователя

  - Требует: email, username, password
  - Возвращает: данные пользователя

- `POST /token/` - Получение JWT токена
  - Требует: username, password
  - Возвращает: access_token

### Привычки (требуют аутентификации)

- `POST /habits/` - Создать новую привычку

  - Требует: title, description (опционально), frequency
  - Возвращает: созданную привычку

- `GET /habits/` - Получить список привычек пользователя

  - Параметры: skip (опционально), limit (опционально)
  - Возвращает: список привычек

- `GET /habits/{habit_id}` - Получить информацию о конкретной привычке

  - Возвращает: информацию о привычке

- `PUT /habits/{habit_id}` - Обновить информацию о привычке

  - Требует: title, description (опционально), frequency
  - Возвращает: обновленную привычку

- `DELETE /habits/{habit_id}` - Удалить привычку
  - Возвращает: сообщение об успешном удалении

## Использование API

1. Зарегистрируйте нового пользователя через `/register/`
2. Получите токен через `/token/`
3. Используйте токен в заголовке запросов:
   ```
   Authorization: Bearer <your_token>
   ```
4. Теперь вы можете использовать все эндпоинты привычек

## Безопасность

- Все пароли хешируются с использованием bcrypt
- JWT токены имеют ограниченный срок действия
- Все эндпоинты привычек защищены аутентификацией
- Пользователи могут видеть и редактировать только свои привычки

## Деплой на GitHub

1. Создайте новый репозиторий на GitHub

2. Инициализируйте git в вашем проекте:

```bash
git init
```

3. Добавьте файлы в git:

```bash
git add .
```

4. Создайте первый коммит:

```bash
git commit -m "Initial commit"
```

5. Добавьте удаленный репозиторий:

```bash
git remote add origin https://github.com/ваш-username/название-репозитория.git
```

6. Отправьте код в GitHub:

```bash
git push -u origin main
```

## Важные замечания

1. Не забудьте создать файл `.env` с вашими секретными ключами
