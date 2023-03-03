import '../pages/index.css';
import { submitEditProfileForm, popupEditProfile, formEditElement, popups, submitChangeAvatar, nameInput, jobInput, profileTitle, profileSubtitle } from './utils.js';
import { Card, formAddCard, popupAddCard, formAvatar, handleCardClick } from './card.js';
import { editPopupButton, addPopupButton, buttonCloseEditProfile, changeAvatarButton } from './popup.js';
import { Api } from './api.js';
import { Popup, PopupWithImage } from './popup.js';

import { UserInfo2 } from './userInfo';

import { FormValidator, enableValidationObj } from './validate.js';

export const popupImageCloseButton = document.querySelector('.popup__image-cross');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupAvatarCloseButton = popupAvatar.querySelector('#closeAvatarButton');
export const saveNewAvatarButton = popupAvatar.querySelector('#addAvatarButton');
export const avatarInput = popupAvatar.querySelector('.popup__text_type_avatar');

const popupImage = document.querySelector('.popup__image');

//export let userId;
export const userId = "c6b69b7acd7fe01fee50d11b"; // убрать когда создадим класс пользователя

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
    'Content-Type': 'application/json'
  }
});

// валидация формы добавления карточки
const addCardFormValidation = new FormValidator( enableValidationObj, formAddCard);
// прикрутить сюда апи
addCardFormValidation.enableValidation();
// валидация формы редактированя карточки
const editAvatarFormValidation = new FormValidator( enableValidationObj, formAvatar);
editAvatarFormValidation.enableValidation();

const editProfileFormValidation = new FormValidator( enableValidationObj, formEditElement);
editProfileFormValidation.enableValidation();



// логика отображения массива карточек когорты
// Для каждой карточки создадим экземпляр класса Card.

export function renderCohortCards() {

  api.getInitialCards().then((data) => {
    data.reverse().forEach( (el) => {

      const card = new Card(el, ".card-template", handleCardClick);
      //card.addEventListener('click', )
      card.render(card.generate());

    });
  })
  .catch((err) => { `Ошибка:${err}` });
};

//отображение инфы юзера
export function showUserInfo() {

  const kkk = new UserInfo2({ name, about })

    kkk.getUserInfo();


    // profileTitle.textContent = data.name;
    // profileSubtitle.textContent = data.about;
    // changeAvatarButton.src = data.avatar;
    //userId = data._id;


    renderCohortCards(); // отриуем карточки когорты

    //.catch(err => `Ошибка: ${err}`);
};
showUserInfo(); //отобразим данные обо мне при загрузке страницы


// экземпляры класса ПОПАП
const openPopupEditProfile = new Popup(popupEditProfile);
openPopupEditProfile.setEventListeners(); // активируем все слушатели всех попапов

const openPopupAddCard = new Popup(popupAddCard);

const openPopupAvatar = new Popup(popupAvatar);

const openPopupImage = new PopupWithImage(popupImage);

//открытие модалок(попапов)
editPopupButton.addEventListener('click', function () {
  openPopupEditProfile.openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addPopupButton.addEventListener('click', function () {
  openPopupAddCard.openPopup(popupAddCard);
});

changeAvatarButton.addEventListener('click', function () {
  openPopupAvatar.openPopup(popupAvatar);
});

formEditElement.addEventListener('submit', submitEditProfileForm);
//formAddCard.addEventListener('submit', submitAddCardForm); // обработчик формы добавления карточки
formAvatar.addEventListener('submit', submitChangeAvatar); // бработчик формы добавления авы



