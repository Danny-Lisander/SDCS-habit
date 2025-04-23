import { useState } from 'react';
import { registerUser } from '../../services/api';

function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Успешная регистрация! Войдите.');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegisterForm;
