import '../pages/index.css';
import { formEditElement } from './utils.js';
import { Card, formAddCard, formAvatar, placeInput, linkInput } from './card.js';
import { editPopupButton, addPopupButton, changeAvatarButton } from './popup.js';
import { Api } from './api.js';
import Popup from './popup.js';
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';

import { UserInfo } from './userInfo';

import { FormValidator, enableValidationObj } from './validate.js';

export const popupAvatar = document.querySelector('#popup-avatar');
export const popupAvatarCloseButton = popupAvatar.querySelector('#closeAvatarButton');
export const saveNewAvatarButton = popupAvatar.querySelector('#addAvatarButton');
export const avatarInput = popupAvatar.querySelector('.popup__text_type_avatar');

const popupImage = document.querySelector('.popup__image');
export const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');

//export let userId;
export const userId = "d4cd3c3ae287bd684ff7aa5a"; // убрать когда создадим класс пользователя

// Создаем экземпляр класса АПИ с данными для запросов на сервер 

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
    'Content-Type': 'application/json'
  }
});

//----------- ВЫВОД ИЗНАЧАЛЬНОЙ ИНФОРМАЦИИ ПРОФИЛЯ -------------

const profile = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle"
});


profile.loadUserInfo()

// создадим кастомное событие
const eventShowForm = new CustomEvent('showForm'); // нужно найти правильное место этой переменной

//----------- ВЫВОД ИЗНАЧАЛЬНОГО МАССИВА КАРТОЧЕК -------------

export function renderInitialCards() {

  api.getCardsData().then((data) => {
    const cardList = new Section(
      {
        items: data,
        renderer: (item) => {
          const cardElement = new Card(
            {
              cardData: item,
              handleCardClick: () => {
                const popupOverview = new PopupWithImage('.popup__image');
                popupOverview.setEventListeners();
                popupOverview.openPopup({ txt:item.name, link:item.link });
              }
            }, ".card-template");
          cardList.addItem(cardElement.generate());
        },
      },
      ".elements"
    )
    cardList.renderItems();
  });
};

renderInitialCards(); // отрисуем карточки 

//----------- РАБОТА ПОПАПОВ -------------

// экземпляры класса ПОПАП


// Попап с формой добавления карточки
const openPopupAddCard = new PopupWithForm({
  popupSelector: '.popup__add-card',
  submitFormCallback: (formData) => {
    const {
      name: placeInput,
      link: linkInput,
    } = formData;

    openPopupAddCard.renderWhileSaving(); // поменяем текст на "сохранение"

    api.uploadNewCard({ name: placeInput.value, link: linkInput.value })
      .then((data) => {
        const updatedCardList = new Section({
          data,
          renderer: (item) => {
            const newCardToAdd = new Card({
              data: item,

              handleCardClick: () => {
                const popupOverviewNewImg = new PopupWithImage('.popup__image');
                const txt = item.name;
                const link = item.link;
                popupOverviewNewImg.setEventListeners();
                popupOverviewNewImg.openPopup({ txt, link });
              }
              
            }, ".card-template")
            updatedCardList.addItem(newCardToAdd.generate());
          },
        }, ".elements");

        
      })

      .catch((err) => {
        console.log(`${err}такая-то`);
      })
      .finally(openPopupAddCard.renderWhenSaved()); //вернем изначальный текст
  }
});

// Активация слушателей попапа добавления карточки
openPopupAddCard.setEventListeners();

// валидация формы добавления карточки
const addCardFormValidation = new FormValidator( enableValidationObj, formAddCard);

addCardFormValidation.enableValidation();

function showPopupAddCard() {
  openPopupAddCard.openPopup({
    event: eventShowForm
  });
}

addPopupButton.addEventListener('click', showPopupAddCard);

//--------------------------------------------------------//-------------------------------//
// Попап с формой редактирования профиля

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup__edit-profile',
  submitFormCallback: (formData) => {
    const {
      name: name,
      about: about
    } = formData;

    profile.setUserInfo(name, about);
    popupEditProfile.closePopup();
  }
});


popupEditProfile.setEventListeners(); // активируем все слушатели

const editProfileFormValidation = new FormValidator(enableValidationObj, formEditElement);
editProfileFormValidation.enableValidation();

// Ф, добавляющая событие, которое произойдёт при открытии 
function showPopupEditProfile() {
  popupEditProfile.openPopup({
    event: eventShowForm
  });
};
editPopupButton.addEventListener('click', showPopupEditProfile);


//--------------------------------------------------------//-------------------------------//
//попап с формой редактирования авы

const openPopupAvatar = new PopupWithForm({
  popupSelector: '.popup__avatar',
  submitFormCallback: (formData) => {
    const {
      link: link
    } = formData;
    popupAvatar.renderWhileSaving();
    api.updateAvatarOnServer({ link: link })
      .then(() => {
        profile.setUserInfo({ avatar: link });
        openPopupAvatar.closePopup();
      })
      .catch((err) => {
        console.log(`${err}такая-то`);
      })
      .finally(openPopupAvatar.renderWhenSaved());
  }
});

// Активация слушателей попапа добавления карточки
openPopupAvatar.setEventListeners();

// валидация формы редактированя карточки
const editAvatarFormValidation = new FormValidator(enableValidationObj, formAvatar);
editAvatarFormValidation.enableValidation();

// Ф, добавляющая событие, которое произойдёт при открытии 
function showPopupAva() {
  openPopupAvatar.openPopup({
    event: eventShowForm
  });
};
changeAvatarButton.addEventListener('click', showPopupAva);



