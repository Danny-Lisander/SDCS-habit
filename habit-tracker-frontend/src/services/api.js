import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // поменяй на свой адрес FastAPI, если нужно
});

// Добавим токен в каждый запрос
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Отправка email+password на логин
export const loginUser = (data) =>
  API.post('/token/', null, {
    params: {
      username: data.username,
      password: data.password,
    },
  });

// Регистрация
export const registerUser = (data) => API.post('/register/', {
  email: data.email,
  username: data.username,
  password: data.password
});

// Получение токена
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Получить все привычки
export const getHabits = () =>
  API.get('/habits/', {
    headers: getAuthHeader(),
  });

// Создать новую привычку
export const createHabit = (data) =>
  API.post('/habits/', data, {
    headers: getAuthHeader(),
  });

// Обновить привычку (например, выполнение)
export const updateHabit = (id, data) =>
  API.put(`/habits/${id}`, data, {
    headers: getAuthHeader(),
  });

// Удалить привычку
export const deleteHabit = (id) =>
  API.delete(`/habits/${id}`, {
    headers: getAuthHeader(),
  });

