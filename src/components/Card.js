import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
export default function Card({ card, onCardClick, onLikeClick, onDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  console.log(isLiked);
  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onLikeClick(card);
  };
  const handleDeleteClick = () => {
    onDeleteCard(card);
  };
  return (
    <article className="element">
      {isOwner && (
        <button
          type="button"
          className="element__delete"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={`element__like-icon ${isLiked && 'element__like-icon_active'
              }`}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
