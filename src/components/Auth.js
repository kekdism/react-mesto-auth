import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Auth({ title, submitText, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ password, email });
  };
  return (
    <main className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <input
          className="auth__input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <button type="submit" className="auth__submit">
          {submitText}
        </button>
        <NavLink
          to="/sign-in"
          className="auth__link"
          activeClassName="auth__link_hidden"
        >
          Уже зарегистрированы? Войти
        </NavLink>
      </form>
    </main>
  );
}
