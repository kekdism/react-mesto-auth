import PopupWithoutForm from './PopupWithoutForm';
import succIcon from '../images/AuthSuccess.svg';
import failIcon from '../images/AuthError.svg';
const succText = `Вы успешно зарегистрировались!`;
const failText = `Что-то пошло не так! Попробуйте ещё раз.`;

export default function InfoTooltip({ status, isOpen, onClose }) {
  return (
    <PopupWithoutForm isOpen={isOpen} onClose={onClose}>
      <div className="tooltip">
        <img
          src={status ? succIcon : failIcon}
          alt={status ? 'Успешно' : 'Ошибка'}
          className="tooltip__icon"
        />
        <p className="tooltip__text">{status ? succText : failText}</p>
      </div>
    </PopupWithoutForm>
  );
}
