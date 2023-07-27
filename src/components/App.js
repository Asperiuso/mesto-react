import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Добавляем selectedCard

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleDeleteClick = () => {
    setDeletePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null); 
  };

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onDelete={handleDeleteClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* Редактировать профиль */}
        {isEditProfilePopupOpen && (
          <PopupWithForm title="Редактировать профиль" popupClassName="popup-edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
            <fieldset className="popup__input">
              <label className="popup__label">
                <input
                  required
                  className="popup__input-item popup__input-item_profile_name"
                  id="profilename"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
                />
                <span className="popup__input-error-message" id="profilename-error"></span>
              </label>
              <label className="popup__label">
                <input
                  required
                  className="popup__input-item popup__input-item_profile_profission"
                  id="profileprofession"
                  name="about"
                  type="text"
                  placeholder="О себе"
                  minLength="2"
                  maxLength="200"
                />
                <span className="popup__input-error-message" id="profileprofession-error"></span>
              </label>
            </fieldset>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </PopupWithForm>
        )}

        {/* Новое место */}
        {isAddPlacePopupOpen && (
          <PopupWithForm title="Новое место" popupClassName="popup-add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <fieldset className="popup__input">
              <label className="popup__label">
                <input
                  required
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
            <button className="popup__save-button" type="submit">Создать</button>
          </PopupWithForm>
        )}

        {/* Попап с изображением */}
        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}

        {/* Обновить аватар */}
        {isEditAvatarPopupOpen && (
          <PopupWithForm title="Обновить аватар" popupClassName="popup-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <fieldset className="popup__input">
              <label htmlFor="avatar" className="popup__label">
                <input
                  required
                  className="popup__input-item popup__input-item_avatar"
                  type="url"
                  id="avatar"
                  placeholder="Ссылка на аватар"
                />
                <span className="popup__input-error-message" id="avatar-error"></span>
              </label>
            </fieldset>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </PopupWithForm>
        )}

        {/* Попап для подтверждения удаления */}
        {isDeletePopupOpen && (
          <PopupWithForm title="Вы уверены?" popupClassName="popup-delete" isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
            <button className="popup__save-button" type="submit">Да</button>
          </PopupWithForm>
        )}

      </div>
    </div>
  );
}

export default App;
