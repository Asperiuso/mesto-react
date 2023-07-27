import React from "react";

function PopupWithForm(props) {
  const popupClassName = `popup ${props.popupClassName} ${props.isOpen ? 'popup_opened' : ''}`;

  const handlePopupClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div className={popupClassName} onClick={handlePopupClick}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть попап" onClick={props.onClose}></button>
        <h3 className="popup__heading">{props.title}</h3>
        <form className="popup__form" id={props.name} name={props.name} noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
