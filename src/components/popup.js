import { popupAddCard, popupImage, Card } from "./card.js";
import { popupEditProfile, popups } from "./utils.js";
import { popupAvatar, popupImageCloseButton, popupAvatarCloseButton } from "./index.js";

const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки
export const changeAvatarButton = document.querySelector('.profile__image');

// отвечает за открытие и закрытие попапов
export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }
    // открытие попапа и добавление листенера закрытия при нажатии на Esc
    openPopup(popupSelector) {
        popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    };
    // закрытие попапа и удаление листенера закрытия при нажатии на Esc
    closePopup(popupSelector) {
        popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (e) => this._handleEscClose(e));
    };
    //закрыть попап нажатием на esc
    _handleEscClose(e) {
        if (e.code === "Escape") {
            popups.forEach((popup) => this.closePopup(popup));
        };
    };
    //обрабочтки событий
    setEventListeners() {
        // закрытиe попапа Добавления карточки
        buttonCloseAddCard.addEventListener('click', () => this.closePopup(popupAddCard));
        // закрытиe попапа ПРОфиля
        buttonCloseEditProfile.addEventListener('click', () => this.closePopup(popupEditProfile));
        // закрытиe попапа ПРОсмотра фоток карточки
        popupImageCloseButton.addEventListener('click', () => this.closePopup(popupImage));
        // закрытиe попапа АВАтарки
        popupAvatarCloseButton.addEventListener('click', () => this.closePopup(popupAvatar));
        //закрытие попапов кликом на оверлей
        popups.forEach((modal) => {
            modal.addEventListener('click', (event) => {
                if (event.target === modal)
                    this.closePopup(modal);
            });
        });
    }
}


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(evt) {
        evt.target.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    };

}

// document.querySelector(this.popupSelector) // нашли секцию попапа просмотра картинок
// .querySelector(('.popup__image-image'))
// .src = evt.target.src;

//  вставим в попап картинку с src изображения и подписью к картинке.

//p.textContent = this.popupSelector.querySelector('.popup__image-heading').textContent; // заголовок для картинки



class PopupWithForm extends Popup {
    constructor() {
        super(popupSelector);
        // колбэк сабмита формы.
    }
    _getInputValues() {
        // Перезаписывает родительский метод setEventListeners.

        // добавлять обработчик клика иконке закрытия,

        //   но и добавлять обработчик сабмита формы.
    }


    // Перезаписывает родительский метод close, так как при закрытии попапа
    //  форма должна ещё и сбрасываться.


    // Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

}


export { editPopupButton, addPopupButton, buttonCloseEditProfile, buttonCloseAddCard };
