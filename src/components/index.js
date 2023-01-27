import '../pages/index.css';
import { initialCards } from './constants.js';
import { openPopup, closePopup, submitEditProfileForm, popupEditProfile, formEditElement, popups } from './utils.js';
import { popupImage, addCard, submitAddCardForm, formAddCard, popupAddCard } from './card.js';
import { editPopupButton, addPopupButton, buttonCloseAddCard, buttonCloseEditProfile } from './modal.js';

const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');

//загржуаем карточки на страницу (инициализация)
initialCards.reverse().forEach(addCard);

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
popups.forEach((modal) => {
  modal.addEventListener('click', function (event) {
    if (event.target === modal)
      closePopup(modal);
  });
});



