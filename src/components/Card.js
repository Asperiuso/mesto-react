import React from "react";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-container">
          <button className="card__like-button"></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button className="card__delete-button"></button>
    </div>
  );
}

export default Card;
