import '../pages/index.css';
import { formEditElement } from './utils.js';
import { Card, formAddCard, formAvatar, placeInput, linkInput } from './card.js';
import { editPopupButton, addPopupButton, changeAvatarButton } from './popup.js';
import { Api } from './api.js';
import Popup from './popup.js';
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';

import { UserInfo2 } from './userInfo';

import { FormValidator, enableValidationObj } from './validate.js';


export const popupAvatar = document.querySelector('#popup-avatar');
export const popupAvatarCloseButton = popupAvatar.querySelector('#closeAvatarButton');
export const saveNewAvatarButton = popupAvatar.querySelector('#addAvatarButton');
export const avatarInput = popupAvatar.querySelector('.popup__text_type_avatar');

const popupImage = document.querySelector('.popup__image');
export const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');

//export let userId;
export const userId = "d4cd3c3ae287bd684ff7aa5a"; // убрать когда создадим класс пользователя

//экземпляр класса АПИ
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '38e35aea-5cfc-4e58-bba6-375b97d69ebd',
    'Content-Type': 'application/json'
  }
});

//----------- ОТОБРАЖЕНИЕ ИНФЫ ЮЗЕРА -------------
const profile = new UserInfo2({
  name: ".profile__title",
  about: ".profile__subtitle"
});

profile.getUserInfo();

// создадим кастомное событие
const eventShowForm = new CustomEvent('showForm');


//----------- логика отображения массива карточек когорты -------------

// Для каждой карточки создадим экземпляр класса Card.

export function renderCohortCards() {

  api.getInitialCards().then((data) => {
    const cardList = new Section(
      {
        items: data,
        renderer: (item) => {
          const cardElement2 = new Card(
            {
              data: item,
              handleCardClick: () => {
                const popupOverview = new PopupWithImage('.popup__image');

                const txt = item.name;
                const link = item.link;
                popupOverview.setEventListeners();
                popupOverview.openPopup({ txt, link });
              }
            }, ".card-template");
          cardList.addItem(cardElement2.generate());
        },
      },
      ".elements"
    )
    cardList.renderItems();
  });
};

renderCohortCards(); // отрисуем карточки когорты


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

    api.uploadNewCard({ name: placeInput, link: linkInput })
      .then((res) => {
        if (res.ok) {
          openPopupAddCard.closePopup();
          renderCohortCards();
        }
      })
      .catch((err) => {
        console.log(`${err}такая-то`);
      })
      .finally(openPopupAddCard.renderWhenSaved()); //вернемм изначальный текст
  }
});

// валидация формы добавления карточки
const addCardFormValidation = new FormValidator(enableValidationObj, formAddCard);

addCardFormValidation.enableValidation();

function showPopupAddCard() {
  openPopupAddCard.openPopup({
    event: eventShowForm
  });
  // Активация слушателей попапа добавления карточки
  openPopupAddCard.setEventListeners();
}

addPopupButton.addEventListener('click', showPopupAddCard);

// отправляем данные о карточке на сервер
// .then((data) => {
//   const card = new Card({
//     data,
//     handleCardClick: () => {
//         const popupOverviewNewImg = new PopupWithImage('.popup__image');

//         const txt = data.name;
//         const link = data.link;
//         popupOverviewNewImg.setEventListeners();
//         popupOverviewNewImg.openPopup({ txt, link });
//       }

//   },
//     ".card-template");


//   const cardElement = getCardElement(data, user.getUserInfo())
//   cards.addItem(cardElement)


//card.render(card.generate());


// Ф, добавляющая событие, которое произойдёт при открытии 

//--------------------------------------------------------//-------------------------------//
// Попап с формой редактирования профиля

const openPopupEditProfile = new PopupWithForm({
  popupSelector: '.popup__edit-profile',
  submitFormCallback: (formData) => {
    const {
      name: name,
      about: about
    } = formData;

    popupProfile.renderWhileSaving();

    profile.setUserInfo(name, about);
    popupProfile.renderWhenSaved();
    popupProfile.closePopup();

    popupProfile.renderWhenSaved();
  }
});

openPopupEditProfile.setEventListeners(); // активируем все слушатели

const editProfileFormValidation = new FormValidator(enableValidationObj, formEditElement);
editProfileFormValidation.enableValidation();

// Ф, добавляющая событие, которое произойдёт при открытии 
function showPopupEditProfile() {
  openPopupEditProfile.openPopup({
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



