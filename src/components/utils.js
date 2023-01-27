import { handleEscape } from './modal.js';
import { profileSubtitle, profileTitle } from './validate.js';

export const popups = document.querySelectorAll('.popup');

export const formEditElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
export const nameInput = formEditElement.querySelector('.popup__text_type_name'); //поле формы
export const jobInput = formEditElement.querySelector('.popup__text_type_job');//еще одно

export const popupEditProfile = document.querySelector('.popup__edit-profile'); //попап редактирования профиля

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape); //слушатель для закрытия по esc
};

export function closePopup(popupElementCross) {
    popupElementCross.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape); // снимаем слушатель после закрытия
};

//функция отправки формы
export function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEditProfile);
};