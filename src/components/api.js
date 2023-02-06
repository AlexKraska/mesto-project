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
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json(); //вернутся данные о пользователе
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};


// Загрузка карточек с сервера
export const getCardFromServer = () => { // поучаем карточку из массива
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json(); //вернули массив с карточками
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

};

// отправит данные при редактироании профиля
export function sendUserDataToServer(nameInput, jobInput) { 
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Добавление новой карточки на сервер
export function addNewCardToServer(placeInput, linkInput) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

// удалим карточку с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

// логика добавления лайка
export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

// логика удаления лайка
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

// Обновление аватара пользователя на сервере
export function sendNewAvatarToServer(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};