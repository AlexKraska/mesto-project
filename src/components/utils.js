import { escapeFromPopup } from './modal.js';

export const cardTemplate = document.querySelector('#card-template').content; //айдишник шаблона для карточки
export const sectionCardElements = document.querySelector('.elements'); //выбрали секцию с карточками
export const popupImage = document.querySelector('.popup__image'); //popupImage (просмотра)
export const popupImageImage = popupImage.querySelector('.popup__image-image'); //сама картинка попапа просмотра
export const popupImageHeading = popupImage.querySelector('.popup__image-heading'); // заголовок для картинки

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', escapeFromPopup); //слушатель для закрытия по esc
};

export function closePopup(popupElementCross) {
    popupElementCross.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeFromPopup); // снимаем слушатель после закрытия
};

export function createCard(el) {
    const cardToCreate = cardTemplate.querySelector('.elements__wrapper').cloneNode(true);
    // наполняем содержимым
    const selectedPhoto = cardToCreate.querySelector('.elements__element');
    const selectedPhotoText = cardToCreate.querySelector('.elements__text');

    selectedPhoto.src = el.link;
    selectedPhotoText.alt = el.alt;
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