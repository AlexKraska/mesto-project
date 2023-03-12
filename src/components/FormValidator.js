export default class FormValidator {

    constructor({ formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass }, formElementToValidate) {

        this.formSelector = formSelector;
        this.inputSelector = inputSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;

        this.formElementToValidate = formElementToValidate;

        this.buttonToDisable = this.formElementToValidate
            .querySelector(this.submitButtonSelector);

        this.inputList = Array.from(this.formElementToValidate.querySelectorAll(this.inputSelector));
    }

    // метод активации ошибки валидации
    _showError(inputToCheck) {
        const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`);

        inputToCheck.classList.add(this.inputErrorClass); //добавили красный бордер снизу инпута   

        errorElement.classList.add(this.errorClass); //стилизаия текста ошибки

    };

    // метод деактивации ошибки валидации 
    _hideError(inputToCheck) {
        const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`);

        inputToCheck.classList.remove(this.inputErrorClass); //добавили красный бордер снизу инпута   
        
        errorElement.classList.remove(this.errorClass); //стилизаия текста ошибки;
    };

    // проверка вадлидности формы
    _checkInputValidity(inputToCheck) {

        if (inputToCheck.validity.patternMismatch) {
            inputToCheck.setCustomValidity(inputToCheck.dataset.errorClass);
        }
        else {
            inputToCheck.setCustomValidity("");
        }

        if (!inputToCheck.validity.valid) {
            this._showError(inputToCheck);
        } else {
            this._hideError(inputToCheck);
        }
    };

    // метод валидации всех полей формы 
    _hasInvalidInput() {
        return this.inputList.some((inputToCheck) => {
             return !inputToCheck.validity.valid;
            // this.resetValidation();
        })
        //this.resetValidation();
    };

    // изменяет состояние кнопки сабмита
    _toggleButtonState() {
        if (this._hasInvalidInput(this.inputList)) {
            this.buttonToDisable.disabled = true;
        } else {
            this.buttonToDisable.disabled = false;
        }
    };

    // устанавливает все обработчики
    _setEventListeners() {
        this._toggleButtonState(this.inputList); // чтобы не ждать ввода данных в поля

        this.inputList.forEach((inputToCheck) => {
            inputToCheck.addEventListener('input', () => {
                this._checkInputValidity(inputToCheck);

                this._toggleButtonState(this.inputList);
            });
        });
    }

    // Метод включения валидации
    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        
        this._toggleButtonState(this.inputList); // управляем кнопкой ==

        this.inputList.forEach((inputElement) => {
            this._hideError(inputElement) // очищаем ошибки ==
        });
    }
};