import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, updateUserAvatar }) {
  const inputAvatarEdit = useRef();
  useEffect(() => {
    inputAvatarEdit.current.value = '';
  }, [isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserAvatar({ avatar: inputAvatarEdit.current.value });
  };
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={inputAvatarEdit}
        id="edit-avatar-url"
        placeholder="Ссылка на картинку"
        className="form__input"
        required
      />
      <span className="form__input-error edit-avatar-url-error"> </span>
    </PopupWithForm>
  );
}
