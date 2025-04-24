import axios from "axios";

// Инициализация axios
const API = axios.create({
  baseURL: "http://localhost:8000", // Укажи адрес сервера, если другой
});

// Автоматическое добавление токена в заголовки
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// 🔐 Аутентификация
//

export const loginUser = (data) =>
  API.post("/token/", null, {
    params: {
      username: data.username,
      password: data.password,
    },
  });

export const registerUser = (data) =>
  API.post("/register/", {
    email: data.email,
    username: data.username,
    password: data.password,
  });

//
// 📦 Привычки (CRUD)
//

export const getHabits = () => API.get("/habits/");

export const createHabit = (data) => API.post("/habits/", data);

export const deleteHabit = (habitId) => API.delete(`/habits/${habitId}`);

//
// ✅ Отметка выполнения привычек
//

// Сохранить лог о выполнении привычки
export const logHabit = (habitId) =>
  API.post("/habits/log/", {
    habit_id: habitId,
    date: new Date().toISOString(),
  });

// Получить все логи привычек пользователя
export const getHabitLogs = () => API.get("/habits/logs/");
