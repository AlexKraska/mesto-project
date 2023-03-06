import { popupAddCard, popupImage, Card } from "./card.js";
import { popupEditProfile, popups } from "./utils.js";
import { popupAvatar, popupImageCloseButton, popupAvatarCloseButton } from "./index.js";

const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки
export const changeAvatarButton = document.querySelector('.profile__image');

// отвечает за открытие и закрытие попапов
export default class Popup {
    constructor(popupSelector) {
        this._popupEl = document.querySelector(popupSelector);
        this._btnCloseEl = this._popupEl.querySelector('.popup__image-cross');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    // открытие попапа и добавление листенера закрытия при нажатии на Esc
    openPopup() {
        this._popupEl.classList.add('popup_opened');
        document.addEventListener('keydown', (ev) => this._handleEscClose(ev));
    };
    // закрытие попапа и удаление листенера закрытия при нажатии на Esc
    closePopup() {
        this._popupEl.classList.remove('popup_opened');
        document.removeEventListener('keydown', (ev) => this._handleEscClose(ev));
    };
    //закрыть попап нажатием на esc
    _handleEscClose(ev) {
        if (ev.code === "Escape") {
            this.closePopup();
        };
    };
    //закрыть попап нажатием на оверлей
    _handleOverlayClose(ev) {
        if (ev.target.classList.contains('popup_opened')) {
            this.closePopup();
      };
    };
    //обрабочтки событий
    setEventListeners() {
        this._btnCloseEl.addEventListener('click', () => {
            this.closePopup();
        })
        this._popupEl.addEventListener('click', (ev) => {
                this._handleOverlayClose(ev);
            });
    };
}

export { editPopupButton, addPopupButton, buttonCloseEditProfile, buttonCloseAddCard };
