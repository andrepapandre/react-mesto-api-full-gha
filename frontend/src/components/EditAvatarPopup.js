import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [image, setImage] = React.useState("");

  function imageInput(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: image,
    });
  }

  React.useEffect(() => {
    setImage("");
  }, [currentUser]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Обновить"}
      onSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          className="popup__input"
          required=""
          minLength={2}
          maxLength={200}
          value={image}
          onChange={imageInput}
        />
        <div className="popup__line" />
        <span className="popup__input-error" id="link-name-erorr" />
      </section>
    </PopupWithForm>
  );
}
