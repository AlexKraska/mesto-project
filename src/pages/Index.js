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
  enableValidationObj
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";


//----------- СОЗДАДИМ ЭКЗЕМПЛЯР КЛАССА API ДЛЯ УПРАВЛЕНИЯ ЗАПРОСАМИ НА СЕРВЕР -------------

//export let userId;

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "38e35aea-5cfc-4e58-bba6-375b97d69ebd",
    "Content-Type": "application/json",
  },
});

//----------- СОЗДАДИМ ЭКЗЕМПЛЯР КЛАССА USERINFO ДЛЯ УПРАВЛЕНИЯ ЭЛЕМЕНТАМИ ПРОФИЛЯ -------------

const userProfile = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__image",
});

//----------- ЗАГРУЗИМ ИЗНАЧАЛЬНЫЙ КОНТЕНТ: ДАННЫЕ ПРОФИЛЯ И КАРТОЧКИ -------------

export let userId = "";

api.getProfileData()
  .then((data) => {
    userId = data._id
  })
  .then(() => {
    loadUserInfo();
    renderInitialCards();
  })
  .catch((err) => {
    console.log(`${err} ошибка в получени данных профиля`);
  })

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
    event: eventShowForm
  });
}

addPopupButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  showPopupAddCard();

}
);
changeAvatarButton.addEventListener("click", showPopupAva);
editPopupButton.addEventListener("click", showPopupEditProfile);


//----------- ФУНКЦИЯ ПОЛУЧЕНИЯ И ВЫВОДА ИЗНАЧАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ -------------

function loadUserInfo() {
  api.getProfileData()
    .then((userData) => {
      userProfile.name.textContent = userData.name;
      userProfile.about.textContent = userData.about;
      userProfile.avatar.src = userData.avatar;
    })
    .catch((err) => {
      `${err} такая ошибочка в загрузке инфы пользователя`
    })
}

//----------- ФУНКЦИЯ ПОЛУЧЕНИЯ И ОТОБРАЖЕНИЯ КАРТОЧЕК -------------

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
        }
      },
      ".elements-container"
    );
    cardList.renderItems();
  })
    .catch((err) => {
      `${err} упсссс, ошибочка в рендере карточек`
    })
}

//----------- ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ -------------

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
      })
      .catch((err) => {
        `${err} упсссс, ошибочка вышла`
      })
      .finally(() => {
        openPopupAddCard.renderWhenSaved();
      })
  }
});

openPopupAddCard.setEventListeners();


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

openPopupAvatar.setEventListeners();

// ля ял ля ял
