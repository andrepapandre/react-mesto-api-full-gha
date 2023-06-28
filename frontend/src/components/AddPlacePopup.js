import React from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, handleAddPlaceSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlaceSubmit({
      name: name,
      link: link,
    });
  }

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function changeInputName(e) {
    setName(e.target.value);
  }

  function changeLinkInput(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Фигак и в продакшен!"}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          placeholder="Название"
          name="title"
          className="popup__input"
          id="popup__input-title"
          required=""
          minLength={2}
          maxLength={40}
          value={name}
          onChange={changeInputName}
        />
        <div className="popup__line" />
        <span className="popup__input-error" id="title-name-error" />
      </section>
      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          className="popup__input"
          id="popup__input-link"
          required=""
          minLength={2}
          maxLength={200}
          value={link}
          onChange={changeLinkInput}
        />
        <div className="popup__line" />
        <span className="popup__input-error" id="link-name-error" />
      </section>
    </PopupWithForm>
  );
}
