import { addCard, closePopup } from "./utils.js";

//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
export const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
const placeInput = formAddCard.querySelector('.popup__text_type_place');
const linkInput = formAddCard.querySelector('.popup__text_type_link');

export const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки

export function submitAddCardForm(evt) {
  evt.preventDefault();
  const card =
  {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value
  }
  addCard(card);
  closePopup(popupAddCard);
  const addButton = document.querySelector('#addButton');
  addButton.disabled = true;
  placeInput.value = '';
  linkInput.value = '';
};