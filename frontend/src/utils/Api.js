export class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
    this.auth = null;
  }

  _processingServerResponse(res) {
    return res.ok ? res.json() : Promise.reject();
  }

  setAuthHeaders(token) {
    console.log('token from api', this.auth);
    this.auth = {
	... this.headers,
	authorization: `Bearer ${token}`,
     };
  }

  getUserInfo() {
    return fetch(this.url + '/users/me', {
      method: 'GET',
      headers: this.auth,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

   editUserInfo({ name, about }) {
    return fetch(this.url + '/users/me', {
      method: 'PATCH',
      headers: this.auth,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  editAvatarImage({ avatar }) {
    return fetch(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.auth,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  renderCards() {
    return fetch(this.url + '/cards', {
      method: 'GET',
      headers: this.auth,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  addCard = ({ name, link }) => {
    return fetch(this.url + '/cards', {
      method: 'POST',
      headers: this.auth,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  };

  deleteCard(id) {
    return fetch(this.url + '/cards/' + id, {
      method: 'DELETE',
      headers: this.auth
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  likeCard(idCard) {
    return fetch(this.url + '/cards/' + idCard + '/likes', {
      method: 'PUT',
      headers: this.auth,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  deleteLikeCard(idCard) {
    return fetch(this.url + '/cards/' + idCard + '/likes', {
      method: 'DELETE',
      headers: this.auth,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});
