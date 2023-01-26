import '../pages/index.css';
import { initialCards } from './constants.js';
import { popupImage, openPopup, closePopup, addCard } from './utils.js';
import { submitAddCardForm, formAddCard, popupAddCard } from './card.js';
import { editPopupButton, addPopupButton, buttonCloseAddCard, buttonCloseEditProfile } from './modal.js';
import { submitEditProfileForm, formEditElement, popupEditProfile } from './validate.js';


const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');

//загржуаем карточки на страницу (инициализация)
initialCards.reverse().forEach(function (el) {
  addCard(el);
});

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

formEditElement.addEventListener('submit', submitEditProfileForm); //обработчик формы

formAddCard.addEventListener('submit', submitAddCardForm); //обработчик формы добавления карточки

//закрытие попапов кликом на оверлей
popupAddCard.addEventListener('click', function (event) {
  if (event.target === popupAddCard)
    closePopup(popupAddCard);
});
popupEditProfile.addEventListener('click', function (event) {
  if (event.target === popupEditProfile)
    closePopup(popupEditProfile);
});
popupImage.addEventListener('click', function (event) {
  if (event.target === popupImage)
    closePopup(popupImage);
});



