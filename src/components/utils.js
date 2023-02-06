import { handleEscape, changeAvatarButton } from './modal.js';
import { profileSubtitle, profileTitle } from './validate.js';
import { sendUserDataToServer, sendNewAvatarToServer } from './api.js';
import { avatarInput, popupAvatar } from './index.js';
export const popups = document.querySelectorAll('.popup');
export const formEditElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
export const nameInput = formEditElement.querySelector('.popup__text_type_name'); //поле формы
export const jobInput = formEditElement.querySelector('.popup__text_type_job');//еще одно
export const popupEditProfile = document.querySelector('.popup__edit-profile'); //попап редактирования профиля

const submitButtonText = document.querySelectorAll('.popup__button-text');

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    document.addEventListener('keydown', handleEscape); //слушатель для закрытия по esc
};

export function closePopup(popupElementCross) {
    popupElementCross.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape); // снимаем слушатель после закрытия
};


export function formsTextChangeWhileSaving() {
    submitButtonText.forEach(function (el) {
        el.textContent = 'Сохранение...';
    })
};

export function formsTextChangeWhenSaved() {
    submitButtonText.forEach(function (el) {
        el.textContent = 'Сохранить';
    })
};

//функция отправки формы
export function submitEditProfileForm(evt) {
    formsTextChangeWhileSaving(); //меняю текст
    evt.preventDefault();

    sendUserDataToServer(nameInput, jobInput)
    //getUserInfo()
    .then(data => {
        profileTitle.textContent = data.name;
        profileSubtitle.textContent = data.about;
        closePopup(popupEditProfile);
        formsTextChangeWhenSaved();
    })
        .catch(err => `Ошибочка: ${err}`)
     // меняю текст обратно
};

//функция отправки формы новой авы
export function submitChangeAvatar(event) {
    formsTextChangeWhileSaving(); // поменяем текст на "сохранение"
    event.preventDefault(); // сбрасывваем обновление страницы
    
    sendNewAvatarToServer(avatarInput) // отправляем новую ссвлку в свойство аватар
        .then(data => {
            changeAvatarButton.src = data.avatar;
            closePopup(popupAvatar);
            formsTextChangeWhenSaved();
        })
        .catch((err) => console.log(err));
}