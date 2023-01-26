import { closePopup } from "./utils";

const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки

//закрыть попап нажатием на esc
function escapeFromPopup(e) {
    const popups = document.querySelectorAll('#popup');
    popups.forEach(function (event) {
        if (e.code === "Escape" && event.classList.contains('popup_opened')) {
            closePopup(event);
        }
    });
}

export { editPopupButton, addPopupButton, buttonCloseEditProfile, buttonCloseAddCard, escapeFromPopup};