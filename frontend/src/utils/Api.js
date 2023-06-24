export const baseUrl = "https://andrepapandre.nomoredomains.work";

export const apiConfig = { baseUrl: baseUrl };

export class Apic {
  constructor({ baseUrl }) {
    this.url = baseUrl;
  }

  _processingServerResponse(res) {
    return res.ok ? res.json() : Promise.reject();
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      method: "GET",
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  editAvatarImage({ avatar }) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  renderCards() {
    return fetch(this.url + "/cards", {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  addCard = ({ name, link }) => {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  };

  deleteCard(id) {
    return fetch(this.url + "/cards/" + id, {
      method: "DELETE",
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  likeCard(idCard) {
    return fetch(this.url + "/cards/" + idCard + "/likes", {
      method: "PUT",
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  deleteLikeCard(idCard) {
    return fetch(this.url + "/cards/" + idCard + "/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }
}

export const api = new Apic(apiConfig);
