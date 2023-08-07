import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const titleRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
    
    onClose();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      popupClassName="popup-add"
      buttonText="Создать"
    >
      <fieldset className="popup__input">
        <label className="popup__label">
          <input
            required
            ref={titleRef}
            className="popup__input-item popup__input-item_cardTitle"
            id="placetitle"
            name="name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error-message" id="placetitle-error"></span>
        </label>
        <label className="popup__label">
          <input
            required
            ref={linkRef}
            className="popup__input-item popup__input-item_cardLink"
            id="placelink"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            minLength="2"
          />
          <span className="popup__input-error-message" id="placelink-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
