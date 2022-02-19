export const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_errored',
  errorClass: 'form__input-error_visable',
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const buttonOpenEditPopup = document.querySelector(
  '.profile__edit-button'
);
export const buttonOpenAddPopup = document.querySelector(
  '.profile__add-button'
);
export const buttonAvatarEdit = document.querySelector('.profile__image');
export const editPopupName = document.querySelector('#edit-name');
export const editPopupDesc = document.querySelector('#edit-description');
export const userNameSelector = '.profile__name';
export const userDescSelector = '.profile__description';
export const userAvatarSelector = '.profile__image';
export const cardTemplateId = '#element-template';
export const serverUrl = 'https://mesto.nomoreparties.co/v1/cohort-33';
export const token = '5e0c4a37-b5c9-4c9b-b297-290987370e01';
