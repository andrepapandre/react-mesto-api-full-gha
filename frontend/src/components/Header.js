import React from "react";
import logo from "../image/mesto__logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип бренда Место" />
      <div className="header__block-of-auth"> {children}</div>
    </header>
  );
}

export default Header;
