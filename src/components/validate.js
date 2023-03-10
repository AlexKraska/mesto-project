export default class FormValidator {

    constructor({ formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass }, formElementToValidate) {

        this.formSelector = formSelector;
        this.inputSelector = inputSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;

        this.formElementToValidate = formElementToValidate;
    }

    // метод активации ошибки валидации
    _showError(inputToCheck) {
        const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`);

        inputToCheck.classList.add(this.inputErrorClass); //добавили красный бордер снизу инпута   

         //errorElement.textContent = this.errorClass.textContent;
        errorElement.classList.add(this.errorClass); //стилизаия текста ошибки

    };

    // метод деактивации ошибки валидации 
    _hideError(inputToCheck) {
        const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`);

        inputToCheck.classList.remove(this.inputErrorClass); //добавили красный бордер снизу инпута   

         //errorElement.textContent = this.errorClass.textContent;
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
    _hasInvalidInput(inputList) {
        return inputList.some((inputToCheck) => {
            return !inputToCheck.validity.valid;
        })
    };

    // изменяет состояние кнопки сабмита
    _toggleButtonState(inputList) {
        const buttonToDisable = this.formElementToValidate
            .querySelector(this.submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            buttonToDisable.disabled = true;
        } else {
            buttonToDisable.disabled = false;
        }
    };

    // устанавливает все обработчики
    _setEventListeners() {
        const inputList = Array.from(this.formElementToValidate.querySelectorAll(this.inputSelector)); // Находим все поля внутри формы

        this._toggleButtonState(inputList); // чтобы не ждать ввода данных в поля

        inputList.forEach((inputToCheck) => {
            inputToCheck.addEventListener('input', () => {
                this._checkInputValidity(inputToCheck);

                this._toggleButtonState(inputList);
            });
        });

        // чтобы старые ошибки полей сбрасывались при новом открытии
        // this.formElementToValidate.addEventListener('showForm', (e) => {
        //     inputList.forEach((input) => {

        //       this._hideError(inputToCheck)
        //     })
        // }) // так же можно попробовать сделать _hideError(inputToCheck) как метод при закрытии попапа в экземплярах классов
    }

    // Метод включения валидации
    enableValidation() {
        const formList = Array.from(this.formElementToValidate.querySelectorAll(this.formSelector));
        formList.forEach(() => {
            this._setEventListeners();
        });
    }
};