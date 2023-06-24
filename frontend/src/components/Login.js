import React from "react";
import Header from "./Header";
import { Link, Navigate } from "react-router-dom"; // импортируем Routes

export const Login = ({ isLoqqed, onLogin }) => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const [inputs, setInputs] = React.useState(userData);

  const [message, setMessage] = React.useState("");

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(inputs);
  };

  if (isLoqqed) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header>
        <Link className="header__auth" to="/sign-up">
          Регистрация
        </Link>
      </Header>

      <div className="auth__window">
        <h3 className="auth__title">Вxод</h3>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            required
            autoComplete="true"
            name="email"
            type="text"
            placeholder="Email:"
            value={inputs.email || ""}
            onChange={handleChange}
            className="auth__input"
          />
          <input
            required
            autoComplete="true"
            name="password"
            type="password"
            placeholder="Пароль:"
            value={inputs.password || ""}
            onChange={handleChange}
            className="auth__input"
          />
          <button type="submit" className="auth__button">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
