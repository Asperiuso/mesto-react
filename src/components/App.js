import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import api from "../utils/Api";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleCardLike = (card, isLiked) => {
    const method = isLiked ? 'dislike' : 'like';

    api[method](card._id)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.error("Ошибка при обновлении лайка карточки:", error);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api.setUserInfo({ name, about })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при обновлении информации о пользователе:", error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api.setUserAvatar({ avatar })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при обновлении аватара:", error);
      });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(error => {
        console.error("Ошибка при удалении карточки:", error);
      });
  };


  useEffect(() => {
    // Загрузка информации о пользователе с сервера
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке информации о пользователе:", error);
      });

    // Загрузка карточек с сервера
    api.getCardList()
      .then(data => {
        setCards(data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке карточек:", error);
      });
  }, []);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleDeleteClick = () => {
    setDeletePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
    setSelectedImage(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null);
    setImagePopupOpen(false);
    setSelectedImage(null);
  };

  const handleAddPlaceSubmit = (newCard) => {
    api.addCard(newCard)
      .then((addedCard) => {
        setCards([addedCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error("Ошибка при добавлении карточки:", error);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceSubmit}
            onEditAvatar={handleEditAvatarClick}
            onDelete={handleDeleteClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          {/* Редактировать профиль */}
          {isEditProfilePopupOpen && (
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {/* Новое место */}
          {isAddPlacePopupOpen && (
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
          )}

          {/* Обновить аватар */}
          {isEditAvatarPopupOpen && (
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}

          {/* Попап с изображением */}
          {isImagePopupOpen && selectedImage && (
            <ImagePopup card={selectedImage} onClose={closeAllPopups} />
          )}

          {/* Попап для подтверждения удаления */}
          {isDeletePopupOpen && (
            <PopupWithForm title="Вы уверены?" popupClassName="popup-delete" isOpen={isDeletePopupOpen} onClose={closeAllPopups} buttonText="Да">
            </PopupWithForm>
          )}

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
