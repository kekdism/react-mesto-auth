import { serverUrl } from './constants';

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._credentials = 'include';
  }

  async _checkStatus(response) {
    if (!response.ok) {
      return Promise.reject(console.log(response.status));
    }
    return await response.json();
  }

  async getCard(id = '') {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    });
    return await this._checkStatus(res);
  }

  async getUserInfo(user = 'me') {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    });
    return await this._checkStatus(res);
  }

  async updateUserInfo(user = 'me', data) {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async updateUserAvatar(user, data) {
    const res = await fetch(`${this._baseUrl}/users/${user}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async postCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async changeLikeCardStatus(cardId, newStatus) {
    const method = newStatus ? 'PUT' : 'DELETE';
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
      credentials: this._credentials,
    });
    return await this._checkStatus(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    });
    return await this._checkStatus(res);
  }
}

export default new Api({
  baseUrl: serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
