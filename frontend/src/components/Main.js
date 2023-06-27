import React from "react";
import { Link, Navigate } from "react-router-dom"; // импортируем Routes

import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  handleCardClick,
  handleCardLike,
  handleCardDelete,
  cards,
  setCards,
  loggedIn,
  email,
  onLogout,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <Header>
        <p className="header__email">{email}</p>
        <button href="#" className="header__button-exit" onClick={onLogout}>
          Выйти
        </button>
      </Header>
      <main className="container">
        <section className="profile">
          <div className="profile__item">
            <button onClick={onEditAvatar} className="profile__image-button">
              <img
                className="profile__image"
                src={currentUser.avatar}
                alt="Аватар профиля"
              />
            </button>
            <div className="profile__cards">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                onClick={onEditProfile}
                className="profile__edit-button"
              />
              <p className="profile__name-info">{currentUser.about}</p>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__add-btn"
          />
        </section>
      </main>
      <section className="elements" aria-label="Карточки">
        {cards.map((card) => {
          return (
            <Card
              onCardLike={handleCardLike}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </>
  );
}

export default Main;
