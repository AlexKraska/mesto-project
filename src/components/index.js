import '../pages/index.css';
import { openPopup, closePopup, submitEditProfileForm, popupEditProfile, formEditElement, popups, submitChangeAvatar } from './utils.js';
import { popupImage, addCard, submitAddCardForm, formAddCard, popupAddCard, formAvatar } from './card.js';
import { editPopupButton, addPopupButton, buttonCloseAddCard, buttonCloseEditProfile, changeAvatarButton } from './modal.js';
import { getCardFromServer, getUserInfo } from './api.js';
import { profileTitle, profileSubtitle } from "./validate";

const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');
export const popupAvatar = document.querySelector('#popup-avatar');
const popupAvatarCloseButton = popupAvatar.querySelector('#closeAvatarButton');
export const saveNewAvatarButton = popupAvatar.querySelector('#addAvatarButton');
export const avatarInput = popupAvatar.querySelector('.popup__text_type_avatar');

// логиув отображения массива карточек когорты
export function renderCohortCards() {
  getCardFromServer().then((data) => {
    data.reverse().forEach(function (card) {
      const cardOwnerId = card.owner._id; // в эту переменную запишем айдишик создателя
      const likesLength = card.likes.length;
      const cardId = card._id;
      const likes = card.likes;
      
      addCard(card, cardOwnerId, likesLength, cardId, likes);
    });
  })
};

//отображение инфы юзера
export function showUserInfo() {
  getUserInfo().then(data => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    changeAvatarButton.src = data.avatar;
    renderCohortCards(); // отриуем карточки когорты
  })
    .catch(err => `Ошибка: ${err}`);
};
showUserInfo(); //отобразим данные обо мне при загрузке страницы

//открытие и закрытие модалок(попапов)
editPopupButton.addEventListener('click', function joulyy() {
  openPopup(popupEditProfile);
});
addPopupButton.addEventListener('click', function nejou() {
  openPopup(popupAddCard);
});
buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
});
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});
popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});
changeAvatarButton.addEventListener('click', function () {
  openPopup(popupAvatar);
});
popupAvatarCloseButton.addEventListener('click', function () {
  closePopup(popupAvatar);
});

formEditElement.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm); // обработчик формы добавления карточки
formAvatar.addEventListener('submit', submitChangeAvatar); // бработчик формы добавления авы

//закрытие попапов кликом на оверлей
popups.forEach((modal) => {
  modal.addEventListener('click', function (event) {
    if (event.target === modal)
      closePopup(modal);
  });
});



