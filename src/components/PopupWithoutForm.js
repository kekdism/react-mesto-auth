export default function PopupWithoutForm({ isOpen, onClose, children }) {
  return (
    <div className={`popup  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}
