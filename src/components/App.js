import { React, useState, useEffect } from 'react';
import Api from '../utils/Api';
import AuthApi from '../utils/AuthApi';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRouter from './ProtectedRouter';
import Auth from './Auth';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [regisrationStatus, setRegisrationStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const promisesToResolve = [Api.getUserInfo(), Api.getCard()];
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      promisesToResolve.push(AuthApi.tokenValidation(token));
    }
    Promise.all(promisesToResolve)
      .then(([userData, cardList, user]) => {
        setCurrentUser(userData);
        setCards(cardList);
        if (user) {
          setLoggedUser(user.data);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    Api.deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  };

  const handleCardAdd = (newCard) => {
    Api.postCard(newCard)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUserUpdate = (newUser) => {
    Api.updateUserInfo('me', newUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAvatarUpdate = (newAvatar) => {
    Api.updateUserAvatar('me', newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = async (data) => {
    try {
      const { _id } = await AuthApi.login(data);
      const { data: user } = await Api.getUserInfo(_id);
      console.log(user);
      setLoggedUser(user);
      history.push('/');
    } catch (err) {
      return err;
    }
  };

  const handleRegister = async (newUser) => {
    try {
      await AuthApi.authentication(newUser);
      setRegisrationStatus(true);
    } catch (err) {
      setRegisrationStatus(false);
    }
    setIsTooltipOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedUser(null);
    history.push('/sign-in');
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={loggedUser?.email} onLogout={handleLogout} />
        <Switch>
          <Route path="/sign-up">
            <Auth
              key="register"
              title="Регистрация"
              submitText="Зарегистрироваться"
              onSubmit={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Auth
              key="login"
              title="Вход"
              submitText="Войти"
              onSubmit={handleLogin}
            />
          </Route>
          <ProtectedRouter
            path="/"
            component={Main}
            loggedIn={!!loggedUser?._id}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
          />
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          updateUserInfo={handleUserUpdate}
        />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onPlaceAdd={handleCardAdd}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          updateUserAvatar={handleAvatarUpdate}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          onClose={closeAllPopups}
          status={regisrationStatus}
          isOpen={isTooltipOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
