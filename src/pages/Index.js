import "./index.css";

import {
  eventShowForm,
  editPopupButton,
  addPopupButton,
  changeAvatarButton,
  formEditElement,
  nameInput,
  jobInput,
  formAddCard,
  formAvatar,
  enableValidationObj,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//----------- СОЗДАДИМ ЭКЗЕМПЛЯР КЛАССА API ДЛЯ УПРАВЛЕНИЯ ЗАПРОСАМИ НА СЕРВЕР -------------

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "38e35aea-5cfc-4e58-bba6-375b97d69ebd",
    "Content-Type": "application/json",
  },
});

//----------- ПОПАП С ИЗОБРАЖЕНИЕМ  -------------

const popupOverview = new PopupWithImage(".popup__image");

//----------- КОЛБЭК КЛИКА НА КАРТОЧКУ  -------------


const cardClickCallback = (evt) => {
  const targetCard = evt.target.closest(".elements__wrapper");
  const targetCardText = targetCard.querySelector(".elements__text");
  const targetCardImage = targetCard.querySelector(".elements__element");

  popupOverview.setEventListeners();
  popupOverview.openPopup({
    txt: targetCardText.textContent,
    link: targetCardImage.src,
  });
};

//----------- ПОДГОТОВИМ ЭКЗЕМПЛЯРЫ КЛАССОВ USERINFO И SECTION  -------------


let userProfile = {};
let cardList = {};

//----------- ВЫВЕДЕМ ДАННЫЕ ПРОФИЛЯ И ИЗНАЧАЛЬНЫЕ КАРТОЧКИ -------------

Promise.all([api.getProfileData(), api.getCardsData()])
  .then(([profileData, cardsData]) => {
    userProfile = new UserInfo(
      {
        name: ".profile__title",
        about: ".profile__subtitle",
        avatar: ".profile__image",
        id: profileData._id,
      },
      api
    );

    cardList = new Section(
      {
        items: cardsData,
        renderer: function (item) {
          const cardElement = new Card(
            {
              cardData: item,
              userId: userProfile.id,
              api: api,
              handleCardClick: cardClickCallback,
            },

            ".card-template"
          );
          this.addItem(cardElement.generate());
        },
      },
      ".elements-container"
    );
  })
  .then(() => {
    userProfile.renderUserProfile();
    cardList.renderItems();
    openPopupAvatar.setEventListeners();
    popupEditProfile.setEventListeners();
    openPopupAddCard.setEventListeners();

  });

//----------- АКТИВИРУЕМ ВАЛИДАЦИЮ ФОРМ -------------

const editProfileFormValidation = new FormValidator(
  enableValidationObj,
  formEditElement
);

const addCardFormValidation = new FormValidator(
  enableValidationObj,
  formAddCard
);

const editAvatarFormValidation = new FormValidator(
  enableValidationObj,
  formAvatar
);

addCardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();
editProfileFormValidation.enableValidation();

//----------- ВЕШАЕМ СЛУШАТЕЛИ НА КНОПКИ СТРАНИЦЫ-------------

function showPopupEditProfile() {
  nameInput.value = userProfile.name.textContent;
  jobInput.value = userProfile.about.textContent;
  popupEditProfile.openPopup({
    event: eventShowForm,
  });
}

function showPopupAddCard() {
  addCardFormValidation.resetValidation();
  openPopupAddCard.openPopup({
    event: eventShowForm,
  });
}

function showPopupAva() {
  openPopupAvatar.openPopup({
    event: eventShowForm,
  });
}

addPopupButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  showPopupAddCard();
});

changeAvatarButton.addEventListener("click", showPopupAva);
editPopupButton.addEventListener("click", showPopupEditProfile);

//----------- ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ -------------

const openPopupAddCard = new PopupWithForm({
  popupSelector: ".popup__add-card",
  submitFormCallback: (formData) => {
    openPopupAddCard.renderWhileSaving();
    api
      .uploadNewCard(formData.name, formData.link)
      .then((cardObject) => {
        const addedCard = new Card(
          {
            cardData: cardObject,
            userId: userProfile.id,
            api: api,
            handleCardClick: cardClickCallback,
          },
          ".card-template"
        );
        cardList.addItem(addedCard.generate());
      })
      .then(() => {
        openPopupAddCard.closePopup();
      })
      .catch((err) => {
        `${err} упсссс, ошибочка вышла`;
      })
      .finally(() => {
        openPopupAddCard.renderWhenSaved();
      });
  },
});


//----------- ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ -------------

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup__edit-profile",
  submitFormCallback: (formData) => {
    popupEditProfile.renderWhileSaving();
    api.uploadProfileData(formData.name, formData.about)
      .then((userData) => {
        userProfile.name.textContent = userData.name;
        userProfile.about.textContent = userData.about;
        popupEditProfile.closePopup();
      })
      .catch((err) => {
        `${err} такая ошибочка в устновке новой инфы о пользователе`
      })
      .finally(() => {
        popupEditProfile.renderWhenSaved();
      })
  },
});

popupEditProfile.setEventListeners();


//----------- ПОПАП ИЗМЕНЕНИЯ АВАТАРА -------------

const openPopupAvatar = new PopupWithForm({
  popupSelector: ".popup__avatar",
  submitFormCallback: (formData) => {

    openPopupAvatar.renderWhileSaving();

    api.updateAvatarOnServer(formData.link)
      .then((data) => {
        userProfile.avatar.src = data.avatar;
        openPopupAvatar.closePopup();
      })
      .catch((err) => {
        console.log(`${err} такая-то`);
      })
      .finally(() => {
        openPopupAvatar.renderWhenSaved();
      })
  },
});
