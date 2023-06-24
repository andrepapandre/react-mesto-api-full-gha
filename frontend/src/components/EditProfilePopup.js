import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function inputName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });

    // Передаём значения управляемых компонентов во внешний обработчик
  }

  function inputDescription(e) {
    setDescription(e.target.value);
  }

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          placeholder="Имя"
          name="editName"
          className="popup__input"
          id="popup__input-name"
          required=""
          minLength={2}
          maxLength={40}
          value={name || ""}
          onChange={inputName}
        />
        <div className="popup__line" />
        <span className="popup__input-error" id="edit-name-error" />
      </section>
      <section className="popup__section">
        <input
          type="text"
          placeholder="О себе"
          name="editAbout"
          className="popup__input"
          id="popup__input-job"
          required=""
          minLength={2}
          maxLength={200}
          value={description || ""}
          onChange={inputDescription}
        />
        <div className="popup__line" />
        <span className="popup__input-error" id="job-name-error" />
      </section>
    </PopupWithForm>
  );
}
