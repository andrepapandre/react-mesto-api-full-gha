import successfulImage from "../image/Unionss.svg";
import failedImage from "../image/failed.svg";

export default function InfoTooltip({ boolean, isOpen, onClose }) {

  const successfulMessage = "Вы успешно зарегистрировались!";
  const successfulAlt = "Изображение подтверждения регистрации";
  const failedAlt = "Изображение ошибки регистрации";
  const failedMessage = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <section className="popup__container popup__container_status">
        <img
          className="popup__image popup__image_status"
          src={boolean ? successfulImage : failedImage}
          alt={boolean ? successfulAlt : failedAlt}
        />
        <h1 className="popup__title popup__title_status">
          {boolean ? successfulMessage : failedMessage}
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="popup__close-button"
        />
      </section>
    </div>
  );
}
