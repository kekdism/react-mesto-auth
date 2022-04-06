import { serverUrl } from './constants.js'

class AuthApi {
  constructor() {
    this.BASE_URL = serverUrl;
  }
  async _checkStatus(response) {
    if (!response.ok) {
      return Promise.reject(console.log(response.status));
    }
    return await response.json();
  }
  async authentication(data) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${this.BASE_URL}/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return this._checkStatus(response);
  }

  async login(data) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${this.BASE_URL}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return this._checkStatus(response);
  }

  async tokenValidation(token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${this.BASE_URL}/users/me`, {
      method: 'GET',
      headers,
    });
    return this._checkStatus(response);
  }
}

export default new AuthApi();
