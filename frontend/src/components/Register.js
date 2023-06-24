import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Register({ isLogged, onRegister }) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    },
    [userData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  if (isLogged) {
    return <React.Redirect to="/" />;
  }

  return (
    <>
      <Header>
        <Link className="header__auth" to="/sign-in">
          Войти
        </Link>
      </Header>
      <div className="auth__window">
        <h3 className="auth__title">Регистрация</h3>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            autoComplete="true"
            placeholder="Email:"
            name="email"
            type="email"
            value={userData.email || ""}
            onChange={handleChange}
            className="auth__input"
          />
          <input
            autoComplete="true"
            name="password"
            type="password"
            placeholder="Пароль:"
            value={userData.password || ""}
            onChange={handleChange}
            className="auth__input"
          />
          {/* <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль:"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="auth__input"
            
          /> */}
          <button type="submit" className="auth__button">
            Зарегистрироваться
          </button>
        </form>
        <Link className="auth__reg" to="/sign-in">
          Уже Зарегистрированны? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
