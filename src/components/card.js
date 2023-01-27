import { closePopup, openPopup } from "./utils.js";

export const cardTemplate = document.querySelector('#card-template').content; //айдишник шаблона для карточки
export const sectionCardElements = document.querySelector('.elements'); //выбрали секцию с карточками
export const popupImage = document.querySelector('.popup__image'); //popupImage (просмотра)
export const popupImageImage = popupImage.querySelector('.popup__image-image'); //сама картинка попапа просмотра
export const popupImageHeading = popupImage.querySelector('.popup__image-heading'); // заголовок для картинки

//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
export const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
const placeInput = formAddCard.querySelector('.popup__text_type_place');
const linkInput = formAddCard.querySelector('.popup__text_type_link');

export const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки
const addButton = document.querySelector('#addButton');

export function createCard(el) {
    const cardToCreate = cardTemplate.querySelector('.elements__wrapper').cloneNode(true);
    // наполняем содержимым
    const selectedPhoto = cardToCreate.querySelector('.elements__element');
    const selectedPhotoText = cardToCreate.querySelector('.elements__text');

    selectedPhoto.src = el.link;
    selectedPhoto.alt = el.alt;
    selectedPhotoText.textContent = el.name;

    selectedPhoto.addEventListener('click', function () {
        openPopup(popupImage);
        popupImageImage.src = el.link;
        popupImageHeading.textContent = el.name;
        popupImageImage.alt = el.name;
    })
    const bin = cardToCreate.querySelector('.elements__bin'); //удаление карточек
    bin.addEventListener('click', function () {
        cardToCreate.remove();
    });
    const heart = cardToCreate.querySelector('.elements__heart'); // лайк карточке
    function likeToggle() {
        heart.classList.toggle('elements__heart_active');
    };
    heart.addEventListener('click', function () {
        likeToggle();
    });
    return cardToCreate;
};

export function addCard(el) {
    const cardToAdd = createCard(el);
    sectionCardElements.prepend(cardToAdd);
};

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
  addButton.disabled = true;
  evt.target.reset();
};