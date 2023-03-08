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


//функция отправки формы
// export function submitEditProfileForm(evt) {
//     renderWhileSaving(submitButtonEditProfileText); //меняю текст
//     evt.preventDefault();

//     api.uploadProfileData(nameInput.value, jobInput.value)
//         .then(data => {
//             profileTitle.textContent = data.name;
//             profileSubtitle.textContent = data.about;
//             openPopupEditProfile.closePopup(popupEditProfile);
//         })
//         .catch(err => `Ошибочка: ${err}`)
//         .finally(() => { renderWhenSaved(submitButtonEditProfileText) })
//     // меняю текст обратно
// };

//функция отправки формы новой авы
// export function submitChangeAvatar(event) {
//     renderWhileSaving(submitButtonChangeAvatar); // поменяем текст на "сохранение"
//     event.preventDefault(); // сбрасывваем обновление страницы

//     api.updateAvatarOnServer(avatarInput.value) // отправляем новую ссвлку в свойство аватар
//         .then((data) => {
//             changeAvatarButton.src = data.avatar;

//             openPopupAvatar.closePopup(popupAvatar);
//         })
//         .catch((err) => console.log(err))
//         .finally(() => { renderWhenSaved(submitButtonChangeAvatar) })
// }

// функция сабмита формы добавления карточки
// export function submitAddCardForm(evt) {
//     renderWhileSaving(submitButtonAddCardText); // поменяем текст на "сохранение"
//     evt.preventDefault();

//     api.uploadNewCard(placeInput.value, linkInput.value) // отправляем данные о карточке на сервер
//         .then((data) => {  // после берем эти данные оттуда 

//             const card = new Card({
//                 data,
//                 handleCardClick: () => {
//                     // логика
//                 }
//             },
//                 ".card-template");
//             card.render(card.generate());
//             console.log(card.render(card.generate()));

//             openPopupAddCard.closePopup(popupAddCard);

//             addButton.disabled = true;
//             evt.target.reset(); // очищаем поля
//         })
//         .catch((err) => { `Ошибка:${err}` })
//         .finally(() => { renderWhenSaved(submitButtonAddCardText) }); // поменяем текст на "сохранение")
// };