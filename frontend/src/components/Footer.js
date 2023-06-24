import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        ©{new Date().getFullYear()} Mesto Russia Киселева Андрея
        Эдгар-Владимировича
      </p>
    </footer>
  );
}

export default Footer;
