import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popupEl.querySelector('.popup__image-image');
        this._popupTxt = this._popupEl.querySelector('.popup__image-heading');
    }

    openPopup({ txt, link }) {
        this._popupImg.alt = txt;
        this._popupTxt.textContent = txt;
        this._popupImg.src = link;
        
        super.openPopup();
    }
};
