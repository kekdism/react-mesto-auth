import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../images/logo.svg';
import { useEffect } from 'react';

function Header({ email, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!email);
  }, [email]);
  const handleMenuOpen = () => {
    setShowMenu((state) => !state);
  };
  const handleLogoutClick = () => {
    setShowMenu(false);
    onLogout();
  };
  return (
    <>
      <div className={`user-menu ${showMenu && 'user-menu_opened'}`}>
        <p className="user-menu__text">{email}</p>
        <button className="user-menu__button" onClick={handleLogoutClick}>
          Выйти
        </button>
      </div>
      <header className="header page__header">
        <img className="header__logo" src={logo} alt="Логотип" />
        {loggedIn && (
          <>
            <button
              type="button"
              className={`header__open-menu ${
                showMenu && 'header__open-menu_opened'
              }`}
              onClick={handleMenuOpen}
            />
            <div className="user-menu header__menu">
              <p className="user-menu__text">{email}</p>
              <button className="user-menu__button" onClick={handleLogoutClick}>
                Выйти
              </button>
            </div>
          </>
        )}
        {!loggedIn && (
          <nav className="navbar">
            <ul className="navbar__list">
              <NavLink
                to="/sign-in"
                className="navbar__link"
                activeClassName="navbar__link_hidden"
              >
                Войти
              </NavLink>
              <NavLink
                to="/sign-up"
                className="navbar__link"
                activeClassName="navbar__link_hidden"
              >
                Регистрация
              </NavLink>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default React.memo(Header);
