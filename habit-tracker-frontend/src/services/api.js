import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // поменяй на свой адрес FastAPI, если нужно
});

// Отправка email+password на логин
export const loginUser = (data) =>
  API.post('/token/', null, {
    params: {
      username: data.email,
      password: data.password,
    },
  });

// Регистрация
export const registerUser = (data) => API.post('/register/', {
  email: data.email,
  username: data.email.split('@')[0], // временное имя из email
  password: data.password
});