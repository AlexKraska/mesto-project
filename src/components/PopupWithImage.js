import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popupEl.querySelector('.popup__image-image');
        this._popupTxt = this._popupEl.querySelector('.popup__image-heading');
    }

    openPopup(evt) {
        const targetCard = evt.target.closest(".elements__wrapper");
        const targetCardText = targetCard.querySelector(".elements__text");
        const targetCardImage = targetCard.querySelector(".elements__element");

        this._popupImg.alt = targetCardText.textContent;
        this._popupTxt.textContent = targetCardText.textContent;
        this._popupImg.src = targetCardImage.src;
        
        super.openPopup();
    }
};
