import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
  // const [name, setName] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }
const card = props.card.owner

console.log(card);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_black"
  }`;

  return (
    <article className="element">
      <img
        className="element__image"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.link}
        type="src"
      />
      {isOwn && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="element__delete-btn"
        ></button>
      )}

      <div className="element__bottom">
        <h2 type="text" className="element__title" id="kokoko">
          {props.card.name}
        </h2>
        <div
          className="element__like-zone"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button
            type="button"
            onClick={handleCardLike}
            className={cardLikeButtonClassName}
            id="like"
          />
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
