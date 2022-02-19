import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Card from './Card';
export default function Main({
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  cards,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile">
        <div className="profile__info">
          <button
            type="button"
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser?.avatar})` }}
            onClick={onEditAvatar}
          ></button>
          <div className="profile__title">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
              onDeleteCard={onDeleteClick}
            />
          );
        })}
      </section>
    </main>
  );
}
