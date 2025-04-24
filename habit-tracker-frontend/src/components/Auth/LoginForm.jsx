import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.access_token); // FastAPI должен вернуть токен дададада
      navigate("/home");
    } catch (err) {
      alert("Ошибка входа");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input
        name="username"
        type="text"
        placeholder="Имя пользователя"
        onChange={handleChange}
        value={form.username}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;
