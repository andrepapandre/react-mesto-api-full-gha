import React from "react";

export function ImagePopup(props) {
  return (
    <div className={`popup ${props.card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <img
          src={props.card.link}
          alt={props.card.link}
          className="popup__image"
        />
        <p className="popup__name">{props.card.name}</p>
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-button"
        />
      </div>
    </div>
  );
}
