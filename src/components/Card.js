export default class Card {
    constructor({ cardData, userId, api, handleCardClick}, selector) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.likesValue = cardData.likes.length;
        this.likesData = cardData.likes;
        this._id = cardData._id;
        this._idOwner = cardData.owner._id;
        this.handleCardClick = handleCardClick;
        this.userId = userId;
        this._api = api;
        this._selector = selector;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content.cloneNode(true);
        this._element = cardElement;
        this.heart = this._element.querySelector(".elements__heart");
        this.bin = this._element.querySelector(".elements__bin");
    }

    _isOwner() {
        if (this._idOwner === this.userId) {
            return true;
        } else {
            return false;
        }
    }

    _isLiked() {
        if (this.likesData.some((like) => like._id === this.userId)) {
            return true;
        } else {
            return false;
        }
    }

    _setRemoveButtonStatus() {
        if (this._isOwner()) {
            this.bin
                .style.display = "block";

        } else {
            this.bin
                .style.display = "none";
        }
    }

    _setInitialLikeStatus() {
        if (this._isLiked()) {
            this.heart
                .classList.add("elements__heart_active");
        } else {
            this.heart
                .classList.remove("elements__heart_active");
        }
    }

    _setEventListeners() {

        this.heart.addEventListener("click", this.toggleLike.bind(this));
        this.bin.addEventListener("click", this.removeCard.bind(this));
        this._element
            .querySelector(".elements__element")
            .addEventListener("click", this.handleCardClick);

    }

    removeCard(evt) {
        this._api.removeCardFromServer(
            evt.target.closest(".elements__wrapper").dataset.cardId
        )
            .then(() => {
                evt.target.closest(".elements__wrapper").remove();
            })
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

        this._api.getCardsData()
            .then((cardsData) => {
                const targetCardLikesData = cardsData.find(
                    (card) => card._id === targetCardId
                ).likes;
                if (targetCardLikesData.some((like) => like._id === this.userId)) {
                    this._api.removeLikeOnServer(targetCardId).then((updatedCardData) => {
                        evt.target
                            .closest(".elements__wrapper")
                            .querySelector(".elements__likes-counter").textContent =
                            updatedCardData.likes.length;
                        evt.target.classList.remove("elements__heart_active");
                    })
                        .catch((err) => {
                            console.log(`${err} неприятненько`)
                        })
                } else {
                    this._api.addLikeOnServer(targetCardId).then((updatedCardData) => {
                        evt.target
                            .closest(".elements__wrapper")
                            .querySelector(".elements__likes-counter").textContent =
                            updatedCardData.likes.length;
                        evt.target.classList.add("elements__heart_active");
                    })
                        .catch((err) => {
                            console.log(`${err} неприятненько`)
                        })
                }
            })
    }
};

