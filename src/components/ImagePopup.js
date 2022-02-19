export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <figure className="big-image">
          <img className="big-image__image" alt={card?.name} src={card?.link} />
          <figcaption className="big-image__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
