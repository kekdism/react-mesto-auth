export default function PopupWithForm({
  name,
  title,
  submitText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form name={`form-${name}`} className="form" onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          {submitText && (
            <button className={`form__save`} type="submit">
              {submitText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
/* 

*/
