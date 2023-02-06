import { handleEscape, changeAvatarButton } from './modal.js';
import { sendUserDataToServer, sendNewAvatarToServer } from './api.js';
import { avatarInput, popupAvatar } from './index.js';

export const profileTitle = document.querySelector('.profile__title'); //куда вставляем имя
export const profileSubtitle = document.querySelector('.profile__subtitle'); //куда вставляем профессию

export const popups = document.querySelectorAll('.popup');
export const formEditElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
export const nameInput = formEditElement.querySelector('.popup__text_type_name'); //поле формы
export const jobInput = formEditElement.querySelector('.popup__text_type_job');//еще одно
export const popupEditProfile = document.querySelector('.popup__edit-profile'); //попап редактирования профиля

const submitButtonEditProfileText = document.querySelector('#submit-edit-text');
const submitButtonChangeAvatar = document.querySelector('#submit-avatar-text');
//const submitButtonText = document.querySelectorAll('.popup__button-text');

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape); //слушатель для закрытия по esc
};

export function closePopup(popupElementCross) {
    popupElementCross.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape); // снимаем слушатель после закрытия
};

export function renderWhileSaving(el) {
        el.textContent = 'Сохранение...';
};

export function renderWhenSaved(el) {
        el.textContent = 'Сохранить';
};

//функция отправки формы
export function submitEditProfileForm(evt) {
    renderWhileSaving(submitButtonEditProfileText); //меняю текст
    evt.preventDefault();

    sendUserDataToServer(nameInput.value, jobInput.value)
        //getUserInfo()
        .then(data => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
            closePopup(popupEditProfile);
        })
        .catch(err => `Ошибочка: ${err}`)
        .finally(() => { renderWhenSaved(submitButtonEditProfileText) })
    // меняю текст обратно
};

//функция отправки формы новой авы
export function submitChangeAvatar(event) {
    renderWhileSaving(submitButtonChangeAvatar); // поменяем текст на "сохранение"
    event.preventDefault(); // сбрасывваем обновление страницы

    sendNewAvatarToServer(avatarInput.value) // отправляем новую ссвлку в свойство аватар
        .then(data => {
            changeAvatarButton.src = data.avatar;
            closePopup(popupAvatar);
        })
        .catch((err) => console.log(err))
        .finally(() => { renderWhenSaved(submitButtonChangeAvatar) })
}

export function checkResponse(res) {
    // тут проверка ответа
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}