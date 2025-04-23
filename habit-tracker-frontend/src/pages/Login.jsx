import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import '../styles/Auth.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <header>Habit Tracker</header>
      <div className="auth-container">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </div>
      </div>
    </>
  );
}

export default Login;
