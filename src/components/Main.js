import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function handleCardClick(card) {
    props.onCardClick(card);
  }

  function closeAllPopups() {
    props.onCloseAllPopups();
  }

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="аватар профиля"
            />
            <button
              className="profile__avatar-edit-button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Изменить профиль"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__profession">{userDescription}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить карточку"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="area">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={handleCardClick} />
          ))}
        </section>
      </main>
      <ImagePopup card={props.selectedCard} onClose={props.onCloseAllPopups} />
    </div>
  );
}

export default Main;
