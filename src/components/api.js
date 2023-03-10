export class Api {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(`Запрос к ${res.url} статус:${res.status} `);
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // получаем изначальныq массив карточек
  getCardsData() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  //получаем данные пользователя
  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  // получение инфы пользователя
  uploadProfileData(nameValue, aboutValue) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue,
      }),
    })
      .then(this._checkResponse);
  }

  // отправка новой карточки на сервер
  uploadNewCard(nameValue, linkValue) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    })
      .then(this._checkResponse);
  }

  // удаление карточки с сервера
  removeCardFromServer(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // добавление лайка на карточке
  addLikeOnServer(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // удаление лайка на карточке
  removeLikeOnServer(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // обновления аватара
  updateAvatarOnServer(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse);
  }

};
