import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddCardPopup({ isOpen, onClose, onPlaceAdd }) {
  const [newCard, setNewCard] = useState({ name: '', link: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard((newCard) => ({ ...newCard, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceAdd(newCard);
  };
  useEffect(() => {
    setNewCard({ name: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="add-place-name"
        name="name"
        placeholder="Название"
        className="form__input"
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={newCard.name}
        required
      />
      <span className="form__input-error add-place-name-error"> </span>
      <input
        type="url"
        id="add-place-url"
        name="link"
        placeholder="Ссылка на картинку"
        className="form__input"
        onChange={handleChange}
        value={newCard.link}
        required
      />
      <span className="form__input-error add-place-url-error"> </span>
    </PopupWithForm>
  );
}
