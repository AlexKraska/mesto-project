import { checkResponse } from "./utils";

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
    'Content-Type': 'application/json'
  }
};

//Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
};


// Загрузка карточек с сервера
export const getCardFromServer = () => { // поучаем карточку из массива
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)

};

// отправит данные при редактироании профиля
export function sendUserDataToServer(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
    .then(checkResponse)
};

// Добавление новой карточки на сервер
export function addNewCardToServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
    .then(checkResponse)
};

// удалим карточку с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
};

// логика добавления лайка
export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
};

// логика удаления лайка
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
};

// Обновление аватара пользователя на сервере
export function sendNewAvatarToServer(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(checkResponse)
};