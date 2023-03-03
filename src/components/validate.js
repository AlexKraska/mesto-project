import { formAddCard } from './card.js';

export const enableValidationObj = {
  formSelector: '.popup__form', // сам попап
  inputSelector: '.popup__text', // поле ввода
  submitButtonSelector: '.popup__button', //кнопка
  inputErrorClass: 'popup__text_type_error', // нижняя красная рамка
  errorClass: 'popup__place-input-error_active', // оформление стиля текста кастомной ошибки
};

export class FormValidator {

    constructor({ formSelector, inputSelector, submitButtonSelector,
      inputErrorClass, errorClass }, formElementToValidate) {
  
      this.formSelector = formSelector;
      this.inputSelector = inputSelector;
      this.submitButtonSelector = submitButtonSelector;
      this.inputErrorClass = inputErrorClass;
      this.errorClass = errorClass;
  
      this.formElementToValidate = formElementToValidate;
    }
  
    // метод активации ошибки валидации
    _showError() { 
      const inputToCheck = this.formElementToValidate
      .querySelector(this.inputSelector);

      // найдем уникальный id элемента валидируемой формы                  
      const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`); 
      inputToCheck.classList.add(this.inputErrorClass); //добавили красный бордер снизу
      errorElement.classList.add(this.errorClass); //стилизаия текста ошибки
    };
  
    // метод деактивации ошибки валидации 
    _hideError() {
        const inputToCheck = this.formElementToValidate
        .querySelector(this.inputSelector);
      const errorElement = this.formElementToValidate.querySelector(`.popup__${inputToCheck.id}-error`);
      inputToCheck.classList.remove(this.inputErrorClass);

      errorElement.classList.remove(this.errorClass);
      errorElement.textContent = '';
    };
  
    // проверка вадлидности формы
    _checkInputValidity() {
  
    const inputToCheck = this.formElementToValidate
        .querySelector(this.inputSelector);

      if (inputToCheck.validity.patternMismatch) {
        inputToCheck.setCustomValidity(this.inputSelector.dataset.errorMessage);
      } else {
        inputToCheck.setCustomValidity("");
      }
  
      if (!inputToCheck.validity.valid) {
        this._showError();
      } else {
        this._hideError();
      }
    };
  
    // метод валидации всех полей формы 
    _hasInvalidInput( inputList ) {
      return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
      })
    };
  
    // изменяет состояние кнопки сабмита
    _toggleButtonState( inputList ) {
        const buttonToDisable = this.formElementToValidate
          .querySelector(this.submitButtonSelector);
      if (this._hasInvalidInput( inputList )) {
        buttonToDisable.disabled = true;
      } else {
        buttonToDisable.disabled = false;
       // this.submitButtonSelector.classList.remove(this.inactiveButtonClass);
      }
    };
  
    // устанавливает все обработчики
    _setEventListeners() {
      const inputList = Array.from(this.formElementToValidate.querySelectorAll(this.inputSelector)); // Находим все поля внутри формы
      //const buttonElement = this.formElementToValidate.querySelector(this.submitButtonSelector); //кнопка отправки в текущей форме
  
      this._toggleButtonState( inputList ); // чтобы не ждать ввода данных в поля
  
      inputList.forEach(( inputSelector ) => {
        inputSelector.addEventListener('input', () => {
          this._checkInputValidity();
          console.log();
          this._toggleButtonState( inputList );
        });
      });
    }
           
    // Метод включения валидации
    enableValidation() {
      const formList = Array.from(document.querySelectorAll(this.formSelector));
      formList.forEach(() => {
        this._setEventListeners();
      });
    }
  }