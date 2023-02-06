import { addNewCardToServer, deleteCardFromServer, addLike, deleteLike } from "./api.js";
import { closePopup, openPopup, renderWhileSaving, renderWhenSaved } from "./utils.js";
import { userId } from "./index.js";

export const cardTemplate = document.querySelector('#card-template').content; //айдишник шаблона для карточки
export const sectionCardElements = document.querySelector('.elements'); //выбрали секцию с карточками
export const popupImage = document.querySelector('.popup__image'); //popupImage (просмотра)
export const popupImageImage = popupImage.querySelector('.popup__image-image'); //сама картинка попапа просмотра
export const popupImageHeading = popupImage.querySelector('.popup__image-heading'); // заголовок для картинки

//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
export const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
export const placeInput = formAddCard.querySelector('.popup__text_type_place');
export const linkInput = formAddCard.querySelector('.popup__text_type_link');
export const formAvatar = document.querySelector('.popup__form_type_avatar');

export const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки
const addButton = document.querySelector('#addButton');
const submitButtonAddCardText = document.querySelector('#submit-add-text');

export function createCard(el, cardOwnerId, likesLength, cardId, likes) { // отрисуем карточку
    const cardToCreate = cardTemplate.querySelector('.elements__wrapper').cloneNode(true);
    const selectedPhoto = cardToCreate.querySelector('.elements__element');
    const selectedPhotoText = cardToCreate.querySelector('.elements__text');

    selectedPhoto.src = el.link;
    selectedPhoto.alt = el.alt;
    selectedPhotoText.textContent = el.name;

    selectedPhoto.addEventListener('click', function () {
        openPopup(popupImage);
        popupImageImage.src = el.link;
        popupImageHeading.textContent = el.name;
        popupImageImage.alt = el.name;
    });

    const bin = cardToCreate.querySelector('.elements__bin'); //удаление карточек
    if (cardOwnerId === userId) { // уоставим мусорки только на своих карточках
        bin.style.display = "block";
    }
    bin.addEventListener('click', function () { // удаление карточки с сервера и со страницы
        deleteCardFromServer(cardId).then(() => {
            cardToCreate.remove()
        })
            .catch(err => `Ошибка:${err}`)
    });
    const heart = cardToCreate.querySelector('.elements__heart'); // сердечко

    if (likes.map((like) => like._id).indexOf(userId) >= 0) {
        heart.classList.add('elements__heart_active')
    };
    function likeToggle() {
        heart.classList.toggle('elements__heart_active');
    };
    const howManyLikes = cardToCreate.querySelector('.elements__likes-counter'); // число лайков
    howManyLikes.textContent = likesLength;

    heart.addEventListener('click', function () {
        // сделаем проверку на наличие класса актив у лайка и если он есть то удаляем лайк
        if (!heart.classList.contains('elements__heart_active')) {
            addLike(cardId).then(data =>
                howManyLikes.textContent = data.likes.length
            )
            .then(() => { likeToggle() })
                .catch(err => `Ошибка:${err}`);
        }
        if (heart.classList.contains('elements__heart_active')) {
            deleteLike(cardId).then(data =>
                howManyLikes.textContent = data.likes.length // ставим лойс и отображаем
            )
            .then(() => { likeToggle() })
                .catch(err => `Ошибка:${err}`);
        }
    });
    return cardToCreate;
};

export function addCard(el, cardOwnerId, likesLength, cardId, likes) {
    const cardToAdd = createCard(el, cardOwnerId, likesLength, cardId, likes);
    sectionCardElements.prepend(cardToAdd);
};

export function submitAddCardForm(evt) {
    renderWhileSaving(submitButtonAddCardText); // поменяем текст на "сохранение"
    evt.preventDefault();

    addNewCardToServer(placeInput.value, linkInput.value) // отправляем данные о карточке на сервер
        .then(data => {  // после берем эти данные оттуда 
            const cardOwnerId = data.owner._id; // в эту переменную запишем айдишик создателя
            const likesLength = data.likes.length;
            const cardId = data._id;
            const likes = data.likes;
            addCard(data, cardOwnerId, likesLength, cardId, likes);
            closePopup(popupAddCard);
            addButton.disabled = true;
            evt.target.reset(); // очищаем поля
        })
        .catch((err) => { `Ошибка:${err}` })
        .finally(() => { renderWhenSaved(submitButtonAddCardText) }); // поменяем текст на "сохранение")
};