import { api } from "./index.js";
import { profile, userId } from "./index.js";


//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
export const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
export const placeInput = formAddCard.querySelector('.popup__text_type_place');
export const linkInput = formAddCard.querySelector('.popup__text_type_link');
export const formAvatar = document.querySelector('.popup__form_type_avatar');

export const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки
export const addButton = document.querySelector('#addButton');
export const submitButtonAddCardText = document.querySelector('#submit-add-text');

// function getUserId() {
//     api.getProfileData()
//     .then((data) => {
//       return userId = data._id;
//     });
//     console.log(userId);
// }
// getUserId();


export class Card {
    constructor({ cardData, handleCardClick }, selector) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.likesValue = cardData.likes.length;
        this.likesData = cardData.likes;
        this._id = cardData._id;
        this._idOwner = cardData.owner._id;
        this.handleCardClick = handleCardClick;
        this._selector = selector;

    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content.cloneNode(true);
        this._element = cardElement;
    }

    _isOwner() {
        //_getUserId();
        if (this._idOwner === userId) {
            return true;
        } else {
            return false;
        }
    }

    _isLiked() {
        //_getUserId();
        if (this.likesData.some((like) => like._id === userId)) {
            return true;
        } else {
            return false;
        }
    }

    _setRemoveButtonStatus() {
        if (this._isOwner()) {
            this._element
                .querySelector(".elements__bin")
                .style.display = "block";

        } else {
            this._element
                .querySelector(".elements__bin")
                .style.display = "none";
        }
    }

    _setInitialLikeStatus() {
        if (this._isLiked()) {
            this._element
                .querySelector(".elements__heart")
                .classList.add("elements__heart_active");
        } else {
            this._element
                .querySelector(".elements__heart")
                .classList.remove("elements__heart_active");
        }
    }

    _setEventListeners() {
        this._element
            .querySelector(".elements__heart")
            .addEventListener("click", this.toggleLike);
        this._element
            .querySelector(".elements__bin")
            .addEventListener("click", this.removeCard);
        this._element
            .querySelector(".elements__element")
            .addEventListener("click", this.handleCardClick);

    }

    removeCard(evt) {
        evt.target.closest(".elements__wrapper").remove();
        api.removeCardFromServer(
            evt.target.closest(".elements__wrapper").dataset.cardId
        );
    }

    generate() {
        this._getElement();
        this._element.querySelector(".elements__element").src = this.link;
        this._element.querySelector(".elements__element").alt = this.name;
        this._element.querySelector(".elements__text").textContent = this.name;
        this._element.querySelector(".elements__likes-counter").textContent = this.likesValue;
        this._element.querySelector(".elements__wrapper").dataset.cardId = this._id;
        this._element.querySelector(".elements__wrapper").dataset.ownerId = this._idOwner;
        this._setRemoveButtonStatus();
        this._setInitialLikeStatus();
        this._setEventListeners();
        return this._element;
    }

    toggleLike(evt) {
        const targetCardId = evt.target
            .closest(".elements__wrapper")
            .getAttribute("data-card-id");

        api.getCardsData().then((cardsData) => {
            const targetCardLikesData = cardsData.find(
                (card) => card._id === targetCardId
            ).likes;

            if (targetCardLikesData.some((like) => like._id === userId)) {
                api.removeLikeOnServer(targetCardId).then((updatedCardData) => {
                    evt.target
                        .closest(".elements__wrapper")
                        .querySelector(".elements__likes-counter").textContent =
                        updatedCardData.likes.length;
                    evt.target.classList.remove("elements__heart_active");
                });
            } else {
                api.addLikeOnServer(targetCardId).then((updatedCardData) => {
                    evt.target
                        .closest(".elements__wrapper")
                        .querySelector(".elements__likes-counter").textContent =
                        updatedCardData.likes.length;
                    evt.target.classList.add("elements__heart_active");
                });
            }
        });
    }

};

