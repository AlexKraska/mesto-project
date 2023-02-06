export const enableValidationObj = {
  formSelector: '.popup__form', // сам попап
  inputSelector: '.popup__text', // поле ввода
  submitButtonSelector: '.popup__button', //кнопка
  inputErrorClass: 'popup__text_type_error', // нижняя красная рамка
  errorClass: 'popup__place-input-error_active', // оформление стиля текста кастомной ошибки
};

// добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, valObj) => {

    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
 
    inputElement.classList.add(valObj.inputErrorClass);//добавили красный бордер снизу
    errorElement.textContent = errorMessage;

    errorElement.classList.add(valObj.errorClass); //стилизаия текста ошибки
};

// удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, valObj) => {

    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);

    inputElement.classList.remove(valObj.inputErrorClass);
    errorElement.classList.remove(valObj.errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
};

// проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        // второй арг - сообщение об ошибке
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidationObj);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement, enableValidationObj);
    }
};

// принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true; // сделай кнопку неактивной
    } else {
        buttonElement.disabled = false; // иначе сделай кнопку активной
    }
};

const hasInvalidInput = (inputList) => { //проверим все поля, настроим статус кнпоки
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        return !inputElement.validity.valid;
    })
};

const setEventListeners = (formElement, valObj) => { //добавит обработчики сразу всем полям формы

    const inputList = Array.from(formElement.querySelectorAll(valObj.inputSelector)); // Находим все поля внутри формы
    const buttonElement = formElement.querySelector(valObj.submitButtonSelector);//кнопка отправки в текущей форме
    toggleButtonState(inputList, buttonElement); // чтобы не ждать ввода данных в поля

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement); // передадим ей форму и проверяемый элемент
            toggleButtonState(inputList, buttonElement); // передадим ей массив полей и кнопку
        });
    });
};

const enableValidation = (valObj) => {
    const formList = Array.from(document.querySelectorAll(valObj.formSelector)); 
    
    formList.forEach((formElement) => {
        setEventListeners(formElement, valObj);
    });
};
//enableValidation(enableValidationObj);

//console.log(hasInvalidInput(inputList));

export { showInputError, hideInputError, isValid, toggleButtonState, hasInvalidInput, setEventListeners, enableValidation };