import { React, useState, useEffect } from 'react';
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
import Api from '../utils/Api';
import { serverUrl } from '../utils/constants';
import { useRef } from 'react/cjs/react.development';

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
  const api = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const token = localStorage.getItem('jwt');
    api.current = new Api({
      baseUrl: serverUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    const promisesToResolve = [api.current.getUserInfo(), api.current.getCard()];
    Promise.all(promisesToResolve)
      .then(([userData, cardList, user]) => {
        setCurrentUser(userData);
        setCards(cardList);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }, [history]);

  const handleCardLike = (card) => {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    api.current.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api.current.deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  };

  const handleCardAdd = async (newCardData) => {
    try {
      const newCard = await api.current.postCard(newCardData);
      setCards(pervCards => [newCard, ...pervCards]);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    }
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
    api.current.updateUserInfo('me', newUser)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAvatarUpdate = (newAvatar) => {
    api.current.updateUserAvatar('me', newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = async (data) => {
    try {
      const { token } = await AuthApi.login(data);
      localStorage.setItem('jwt', token);
      api.current = new Api({
        baseUrl: serverUrl,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const user = await api.current.getUserInfo();
      setCurrentUser(user);
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
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    history.push('/sign-in');
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={currentUser?.email} onLogout={handleLogout} />
        <Switch>
          <Route path="/sign-up">
            <Auth
              key="register"
              title="??????????????????????"
              submitText="????????????????????????????????????"
              onSubmit={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Auth
              key="login"
              title="????????"
              submitText="??????????"
              onSubmit={handleLogin}
            />
          </Route>
          <ProtectedRouter
            path="/"
            component={Main}
            loggedIn={!!currentUser?._id}
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
