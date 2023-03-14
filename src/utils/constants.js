export let userId = ""; 

export const eventShowForm = new CustomEvent("showForm"); 

export const editPopupButton = document.querySelector('.profile__button'); 
export const addPopupButton = document.querySelector('.profile__button-plus'); 
export const changeAvatarButton = document.querySelector('.profile__image');

export const formEditElement = document.querySelector('.popup__form_type_edit'); 
export const nameInput = formEditElement.querySelector('.popup__text_type_name'); 
export const jobInput = formEditElement.querySelector('.popup__text_type_job');

export const formAddCard = document.querySelector('.popup__form_type_add'); 
export const formAvatar = document.querySelector('.popup__form_type_avatar');



export const enableValidationObj = {
    formSelector: '.popup__form', // сам попап
    inputSelector: '.popup__text', // поле ввода
    submitButtonSelector: '.popup__button', //кнопка
    inputErrorClass: 'popup__text_type_error', // нижняя красная рамка
    errorClass: 'popup__place-input-error_active', // оформление стиля текста кастомной ошибки
};