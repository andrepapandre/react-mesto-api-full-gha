class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res.json().then((res) => {
      throw new Error(res.message);
    });
  }

  register({ password, email }) {
    const url = `${this._baseUrl}/signup`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  authorize({ email, password }) {
    const url = `${this._baseUrl}/signin`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkToken(token) {
    const url = `${this._baseUrl}/users/me`;
    this.token = token
    alert(this.token)
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const auth = new Auth("https://andrepapandre.nomoredomains.work");

export default auth;
