export default class Popup {
    constructor(popupSelector) {
        this._popupEl = document.querySelector(popupSelector);
        this._btnCloseEl = this._popupEl.querySelector('.popup__cross');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    // открытие попапа и добавление листенера закрытия при нажатии на Esc
    openPopup() {
        this._popupEl.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    // закрытие попапа и удаление листенера закрытия при нажатии на Esc
    closePopup() {
        this._popupEl.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
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
        this._btnCloseEl.addEventListener('click', (ev) => {
            this.closePopup(ev);
        })
        this._popupEl.addEventListener('click', (ev) => {
                this._handleOverlayClose(ev);
            });
    };
};
