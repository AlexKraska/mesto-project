import { closePopup, popups } from "./utils.js";

const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки
export const changeAvatarButton = document.querySelector('.profile__image');

//закрыть попап нажатием на esc
function handleEscape(e) {
    if (e.code === "Escape") {
        popups.forEach(closePopup);
    };
};

export { editPopupButton, addPopupButton, buttonCloseEditProfile, buttonCloseAddCard, handleEscape };