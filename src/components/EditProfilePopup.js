import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, updateUserInfo }) {
  const currentUser = useContext(CurrentUserContext);
  const [newUserInfo, setNewUserInfo] = useState({
    name: '',
    about: '',
  });
  useEffect(() => {
    setNewUserInfo({
      name: currentUser?.name ?? '',
      about: currentUser?.about ?? '',
    });
  }, [currentUser, isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(newUserInfo);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="edit-profile-name"
        name="name"
        className="form__input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={newUserInfo?.name}
        onChange={handleChange}
        required
      />
      <span className="form__input-error edit-profile-name-error"></span>
      <input
        type="text"
        id="edit-profile-description"
        name="about"
        className="form__input"
        placeholder="Занятие"
        minLength="2"
        maxLength="200"
        value={newUserInfo?.about}
        onChange={handleChange}
        required
      />
      <span className="form__input-error edit-profile-description-error"></span>
    </PopupWithForm>
  );
}
