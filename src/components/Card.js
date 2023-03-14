export default class Card {
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
    this.likeButton = this._element.querySelector(".elements__heart");
    this.removeButton = this._element.querySelector(".elements__bin");
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
      this.removeButton.style.display = "block";
    } else {
      this.removeButton.style.display = "none";
    }
  }

  _setInitialLikeStatus() {
    if (this._isLiked()) {
      this.likeButton.classList.add("elements__heart_active");
    } else {
      this.likeButton.classList.remove("elements__heart_active");
    }
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", this.toggleLike.bind(this));
    this.removeButton.addEventListener("click", this.removeCard.bind(this));
    this._cardImage.addEventListener("click", this.handleCardClick);
  }

  removeCard() {
    this.api
      .removeCardFromServer(this._cardBody.dataset.cardId)
      .then(() => {
        this._cardBody.remove();
      })
      .catch((err) => {
        `${err} упсссс, ошибочка вышла`;
      });
  }

  generate() {
    this._getElement();
    this._cardImage = this._element.querySelector(".elements__element");
    this._cardBody = this._element.querySelector(".elements__wrapper");

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardBody.dataset.cardId = this._id;
    this._cardBody.dataset.ownerId = this._idOwner;
    this._element.querySelector(".elements__text").textContent = this.name;
    this._element.querySelector(".elements__likes-counter").textContent =
      this.likesValue;
    this._setRemoveButtonStatus();
    this._setInitialLikeStatus();
    this._setEventListeners();
    return this._element;
  }

  toggleLike() {
    const targetCardId = this._cardBody.getAttribute("data-card-id");

    this.api.getCardsData().then((cardsData) => {
      const targetCardLikesData = cardsData.find(
        (card) => card._id === targetCardId
      ).likes;
      if (targetCardLikesData.some((like) => like._id === this.userId)) {
        this.api
          .removeLikeOnServer(targetCardId)
          .then((updatedCardData) => {
            this._cardBody.querySelector(
              ".elements__likes-counter"
            ).textContent = updatedCardData.likes.length;
            this.likeButton.classList.remove("elements__heart_active");
          })
          .catch((err) => {
            console.log(`${err} неприятненько`);
          });
      } else {
        this.api
          .addLikeOnServer(targetCardId)
          .then((updatedCardData) => {
            this._cardBody.querySelector(
              ".elements__likes-counter"
            ).textContent = updatedCardData.likes.length;
            this.likeButton.classList.add("elements__heart_active");
          })
          .catch((err) => {
            console.log(`${err} неприятненько`);
          });
      }
    })
    .catch((err) => {
        console.log(`${err} неприятненько`);
      });
  }
}
