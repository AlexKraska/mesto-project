import '../pages/index.css';
import { submitEditProfileForm, popupEditProfile, formEditElement, popups, submitChangeAvatar, nameInput, jobInput, profileTitle, profileSubtitle, submitAddCardForm } from './utils.js';
import { Card, formAddCard, popupAddCard, formAvatar, handleCardClick } from './card.js';
import { editPopupButton, addPopupButton, buttonCloseEditProfile, changeAvatarButton } from './popup.js';
import { Api } from './api.js';
import Popup from './popup.js';
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';

import { UserInfo2 } from './userInfo';

import { FormValidator, enableValidationObj } from './validate.js';

export const popupImageCloseButton = document.querySelector('.popup__image-cross');
export const popupAvatar = document.querySelector('#popup-avatar');
export const popupAvatarCloseButton = popupAvatar.querySelector('#closeAvatarButton');
export const saveNewAvatarButton = popupAvatar.querySelector('#addAvatarButton');
export const avatarInput = popupAvatar.querySelector('.popup__text_type_avatar');

const popupImage = document.querySelector('.popup__image');

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

         //----------- РАБОТА ВАЛИДАЦИИ -------------

// валидация формы добавления карточки
const addCardFormValidation = new FormValidator(enableValidationObj, formAddCard);
// прикрутить сюда апи
addCardFormValidation.enableValidation();
// валидация формы редактированя карточки
const editAvatarFormValidation = new FormValidator(enableValidationObj, formAvatar);
editAvatarFormValidation.enableValidation();

const editProfileFormValidation = new FormValidator(enableValidationObj, formEditElement);
editProfileFormValidation.enableValidation();


         //----------- логика отображения массива карточек когорты -------------

// Для каждой карточки создадим экземпляр класса Card.

// export function renderCohortCards() {

//   api.getInitialCards().then((data) => {

//     data.reverse().forEach((el) => { // отображаю каждую карточку

//       const card = new Card({ // создаем экземпляр класса Card
//         data: el,
//         handleCardClick: (evt) => { // передаем логика открытия попапа просмотра фоток

//           const targetCard = evt.target.closest(".elements__wrapper"); 
//           const targetCardLink = targetCard.querySelector(".elements__element").src
//           const targetCardTitle = targetCard.querySelector(".elements__text").textContent
          
//           const popupImg = document.querySelector('.popup__image-image')
//           const popupTxt = document.querySelector('.popup__image-heading')
         
//           popupImage.classList.add('popup_opened')
//           popupImg.src = targetCardLink;
//           popupTxt.textContent = targetCardTitle;
//         }
//       },
//         ".card-template");

//       card.render(card.generate());
//     });
//   })
//     .catch((err) => { `Ошибка:${err}` });
// };


export function renderCohortCards() {

  api.getInitialCards().then((data) => {
    const cardList = new Section(
      {
        items: data,
        renderer: (item) => {
          const cardElement2 = new Card(
            {
              data: item,
              handleCardClick: (evt) => {
                const targetCard = evt.target.closest(".elements__wrapper"); 
                const targetCardLink = targetCard.querySelector(".elements__element").src
                const targetCardTitle = targetCard.querySelector(".elements__text").textContent
                          
                const popupImg = document.querySelector('.popup__image-image')
                const popupTxt = document.querySelector('.popup__image-heading')
                         
                popupImage.classList.add('popup_opened')
                popupImg.src = targetCardLink;
                popupTxt.textContent = targetCardTitle;
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

// api.getInitialCards()
//     .then((data) => {
//       const cardList = new Section(
//         {
//           items: data,
//           renderer: (item) => {
//             const cardElement2 = new Card(item, ".card-template");
//             cardList.addItem(cardElement2.generate());
//           },
//         },
//         cardListSection
//       );
//       cardList.renderItems();
//     });




                      //----------- ОТОБРАЖЕНИЕ ИНФЫ ЮЗЕРА -------------

export function showUserInfo() {

  const profile = new UserInfo2({ name: ".profile__title", about: ".profile__subtitle" });

  profile.setUserInfo("Joel Miller", "The Last of Us"
    /*'https://about-planet.ru/images/severnaya_amerika/strany/jamayka/jamayka.jpg'*/
  );

  // changeAvatarButton.src = data.avatar;
  //userId = data._id;

  renderCohortCards(); // отриуем карточки когорты

};
showUserInfo(); //отобразим данные обо мне при загрузке страницы


         //----------- РАБОТА ПОПАПОВ -------------

// экземпляры класса ПОПАП

// Попап с фотками
const popupImgOverview = new PopupWithImage(popupImage);
// Активация слушателей попапа с фотками
popupImgOverview.setEventListeners();



export const openPopupEditProfile = new Popup(popupEditProfile);
openPopupEditProfile.setEventListeners(); // активируем все слушатели всех попапов

export const openPopupAddCard = new Popup(popupAddCard);


//попап редактирования
editPopupButton.addEventListener('click', function () {
  openPopupEditProfile.openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//попап добавления карточки
addPopupButton.addEventListener('click', function () {
  openPopupAddCard.openPopup(popupAddCard);
});

//попап редактирования авы
export const openPopupAvatar = new Popup('.popup__avatar');
changeAvatarButton.addEventListener('click', function () {
  openPopupAvatar.openPopup('.popup__avatar');
});

//----------- РАБОТА СЛУШАТЕЛЕЙ САБМИТОВ -------------

formEditElement.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm); // обработчик формы добавления карточки
formAvatar.addEventListener('submit', submitChangeAvatar); // бработчик формы добавления авы


api.getProfileData().then((data) => {
  console.log(data)
});




