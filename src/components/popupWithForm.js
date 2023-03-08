import Popup from './popup.js';

// Перезаписывает родительский метод close, так как при закрытии попапа
//  форма должна ещё и сбрасываться.

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, submitFormCallback }) {
        super(popupSelector);
        
        this.submitFormCallback = submitFormCallback;

        this._formEl = this._popupEl.querySelector('.popup__form');
        this._inputs = this._popupEl.querySelectorAll('.popup__text');
        this._btnSave = this._popupEl.querySelector('.popup__button');
        this._btnText = this._btnSave.textContent;
    }

    // найдем все значения инпутов
    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    // Устанавливаются значения полей, если в методе open передал объект со свойством data
    _setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        });
    }

    getForm() {
        return this._formEl;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitFormCallback(this._getInputValues());
        });
    }

    openPopup({ event, data }) {
        if (data) this._setInputValues(data);
        this._formEl.dispatchEvent(event);
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
        this._formEl.reset();
    }

    renderWhileSaving() {
        this._btnSave.textContent = 'Сохранение...';
        this._btn.disabled = true;
    }

    renderWhenSaved() {
        this._btnSave.textContent = this._btnText;
        this._btnSave.disabled = false;
    }
};