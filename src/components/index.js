import "../pages/index.css";
import { formEditElement, nameInput, jobInput } from "./utils.js";
import {
  Card,
  formAddCard,
  formAvatar,
} from "./card.js";
import {
  editPopupButton,
  addPopupButton,
  changeAvatarButton,
} from "./popup.js";
import { Api } from "./api.js";
import Popup from "./popup.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";

import { UserInfo } from "./userInfo";

import { FormValidator, enableValidationObj } from "./validate.js";

export const popupAvatar = document.querySelector("#popup-avatar");
export const popupAvatarCloseButton =
  popupAvatar.querySelector("#closeAvatarButton");
export const saveNewAvatarButton =
  popupAvatar.querySelector("#addAvatarButton");
export const avatarInput = popupAvatar.querySelector(
  ".popup__text_type_avatar"
);

const popupImage = document.querySelector(".popup__image");
export const popupImageCloseButton = popupImage.querySelector(
  ".popup__image-cross"
);

//export let userId;
export const userId = "d4cd3c3ae287bd684ff7aa5a"; // убрать когда создадим класс пользователя

// Создаем экземпляр класса АПИ с данными для запросов на сервер

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "38e35aea-5cfc-4e58-bba6-375b97d69ebd",
    "Content-Type": "application/json",
  },
});

//----------- ВЫВОД ИЗНАЧАЛЬНОЙ ИНФОРМАЦИИ ПРОФИЛЯ -------------

const profile = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__image",
});

// загрузим инфу о пользователе на страницу
function loadUserInfo() {
  api.getProfileData()
    .then((userData) => {
      profile.name.textContent = userData.name;
      profile.about.textContent = userData.about;
      profile.avatar.src = userData.avatar;
    })
    .catch((err) => {
      `${err} такая ошибочка в загрузке инфы пользователя`
    })
}
loadUserInfo();


// создадим кастомное событие для дальнейших нужд
const eventShowForm = new CustomEvent("showForm"); // нужно найти правильное место этой переменной

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
                const popupOverview = new PopupWithImage(".popup__image");
                popupOverview.setEventListeners();
                popupOverview.openPopup({ txt: item.name, link: item.link });
              },
            },
            ".card-template"
          );
          cardList.addItem(cardElement.generate());
        },
      },
      ".elements-container"
    );
    cardList.renderItems();
  });
}
// отрисуем 30 изначальных карточек
renderInitialCards();

//----------- РАБОТА ПОПАПОВ -------------

const openPopupAddCard = new PopupWithForm({
  popupSelector: ".popup__add-card",
  submitFormCallback: (formData) => {
    openPopupAddCard.renderWhileSaving();
    api.uploadNewCard(formData.name, formData.link)
      .then((cardObject) => {
        const addedCard = new Section(
          {
            data: cardObject,
            renderer: () => {
              const cardElement = new Card(
                {
                  cardData: cardObject,
                  handleCardClick: () => {
                    const popupOverview = new PopupWithImage(".popup__image");
                    popupOverview.setEventListeners();
                    popupOverview.openPopup({ txt: cardObject.name, link: cardObject.link });
                  },
                },
                ".card-template"
              );
              addedCard.addItem(cardElement.generate());
            },
          },
          ".elements-container"
        );
        addedCard.renderItem();
      })
      .then(() => {
        openPopupAddCard.closePopup();
        openPopupAddCard.renderWhenSaved();
      });
  }
});

// Активация слушателей попапа добавления карточки
openPopupAddCard.setEventListeners();

// валидация формы добавления карточки
const addCardFormValidation = new FormValidator(
  enableValidationObj,
  formAddCard
);

addCardFormValidation.enableValidation();

function showPopupAddCard() {
  openPopupAddCard.openPopup({
    event: eventShowForm,
  });
}

addPopupButton.addEventListener("click", showPopupAddCard);

//--------------------------------------------------------//-------------------------------//
// Попап с формой редактирования профиля

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup__edit-profile",
  submitFormCallback: (formData) => {
    popupEditProfile.renderWhileSaving();
    api.uploadProfileData(formData.name, formData.about)
      .then((userData) => {
        formData.name.textContent = userData.name;
        formData.about.textContent = userData.about;

        popupEditProfile.closePopup();
        popupEditProfile.renderWhenSaved();
      })
      .catch((err) => {
        `${err} такая ошибочка в устновке новой инфы о пользователе`
      })
  },
});

popupEditProfile.setEventListeners(); // активируем все слушатели

const editProfileFormValidation = new FormValidator(
  enableValidationObj,
  formEditElement
);
editProfileFormValidation.enableValidation();

// Ф, добавляющая событие, которое произойдёт при открытии
function showPopupEditProfile() {
  nameInput.value = profile.name.textContent;
  jobInput.value = profile.about.textContent;
  popupEditProfile.openPopup({
    event: eventShowForm,
  });
}
editPopupButton.addEventListener("click", showPopupEditProfile);

//--------------------------------------------------------//-------------------------------//
//попап с формой редактирования авы

const openPopupAvatar = new PopupWithForm({
  popupSelector: ".popup__avatar",
  submitFormCallback: (formData) => {

    openPopupAvatar.renderWhileSaving();

    api.updateAvatarOnServer(formData.link)
      .then((data) => {
        profile.avatar.src = data.avatar;

        openPopupAvatar.closePopup();
        openPopupAvatar.renderWhenSaved();
      })
      .catch((err) => {
        console.log(`${err} такая-то`);
      })
  },
});

// Активация слушателей попапа добавления карточки
openPopupAvatar.setEventListeners();

// валидация формы редактированя карточки
const editAvatarFormValidation = new FormValidator(
  enableValidationObj,
  formAvatar
);
editAvatarFormValidation.enableValidation();

// Ф, добавляющая событие, которое произойдёт при открытии
function showPopupAva() {
  openPopupAvatar.openPopup({
    event: eventShowForm
  });
}
changeAvatarButton.addEventListener("click", showPopupAva);
