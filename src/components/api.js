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
  getInitialCards() {
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
  updateAvatarOnServer(url) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then(this._checkResponse);
  }

};


// //Загрузка информации о пользователе с сервера
// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers
//   })
//     .then(checkResponse)
// };


// // Загрузка карточек с сервера
// export const getCardFromServer = () => { // поучаем карточку из массива
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(checkResponse)

// };

// // отправит данные при редактироании профиля
// export function sendUserDataToServer(name, about) {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name,
//       about,
//     })
//   })
//     .then(checkResponse)
// };

// // Добавление новой карточки на сервер
// export function addNewCardToServer(name, link) {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       name,
//       link,
//     })
//   })
//     .then(checkResponse)
// };

// // удалим карточку с сервера
// export function deleteCardFromServer(cardId) {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(checkResponse)
// };

// // логика добавления лайка
// export function addLike(cardId) {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'PUT',
//     headers: config.headers
//   })
//   .then(checkResponse)
// };

// // логика удаления лайка
// export function deleteLike(cardId) {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//   .then(checkResponse)
// };

// // Обновление аватара пользователя на сервере
// export function sendNewAvatarToServer(avatar) {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar
//     })
//   })
//     .then(checkResponse)
// };