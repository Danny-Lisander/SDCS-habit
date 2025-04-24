import { useState } from 'react';
import { registerUser } from '../../services/api';

function RegisterForm() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Успешная регистрация! Теперь войдите.');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="username"
        type="text"
        placeholder="Имя пользователя"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegisterForm;
