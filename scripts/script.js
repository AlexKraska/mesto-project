const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const popupEditProfile = document.querySelector('.popup__edit-profile'); //попам редактирования профиля
const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки
const popupImage = document.querySelector('.popup__image'); //popupImage (просмотра)
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки
const cardElements = document.querySelector('.elements'); //выбрали секцию с карточками

const formElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
let nameInput = formElement.querySelector('.popup__text_type_name'); //поле формы
let jobInput = formElement.querySelector('.popup__text_type_job');//еще одно
let profileTitle = document.querySelector('.profile__title'); //куда вставляем имя
let profileSubtitle = document.querySelector('.profile__subtitle'); //куда вставляем профессию

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};
editPopupButton.addEventListener('click', function joulyy() {
  openPopup(popupEditProfile);
});
addPopupButton.addEventListener('click', function nejou() {
  openPopup(popupAddCard);
});

function closePopup(popupElementCross) {
  popupElementCross.classList.remove('popup_opened');
 // popupEditProfile.classList.remove('popup_opened');
  //popupAddCard.classList.remove('popup_opened');
  placeInput.value = '';
  linkInput.value = '';
};
buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
});
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard)
});

//функция отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};
formElement.addEventListener('submit', handleFormSubmit); //обработчик формы

const initialCards = [ //изначальный массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

function createCard(el) {
  const cardShablon = document.querySelector('#cardShablon').content; //айдишник шаблона для карточки
  const cardToCreate = cardShablon.querySelector('.elements__wrapper').cloneNode(true);
  // наполняем содержимым
  let selectedPhoto = cardToCreate.querySelector('.elements__element');
  let selectedPhotoText = cardToCreate.querySelector('.elements__text');
  selectedPhoto.src = el.link;
  selectedPhotoText.alt = el.alt;
  selectedPhotoText.textContent = el.name

  selectedPhoto.addEventListener('click', function() {
    openPopup(popupImage);
    let popupImageImage = popupImage.querySelector('.popup__image-image');
    let popupImageHeading = popupImage.querySelector('.popup__image-heading');
    popupImageImage.src = el.link;
    popupImageHeading.textContent = el.name;
    popupImageImage.alt = el.name;
    let popupImageCloseButton = popupImage.querySelector('.popup__image-cross');
    popupImageCloseButton.addEventListener('click', function () {
      closePopup(popupImage);
    })
  })

  const bin = cardToCreate.querySelector('.elements__bin'); //удаление карточек
  bin.addEventListener('click', function () {
    cardToCreate.remove();
  });
  const heart = cardToCreate.querySelector('.elements__heart');
  function likeToggle() {
    heart.classList.toggle('elements__heart_active');
  };
  heart.addEventListener('click', function () {
    likeToggle();
  });
  cardElements.prepend(cardToCreate);
};

//загржуаем карточки на страницу 
initialCards.reverse().forEach(function (el) {
  createCard(el);
});

//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
const addCardForm = document.querySelector('.popup__form_type_add'); //форма добавления карточки
let placeInput = addCardForm.querySelector('.popup__text_type_place');
let linkInput = addCardForm.querySelector('.popup__text_type_link');

function userAddCard(evt) {
  evt.preventDefault();
  let card = 
  {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value
  }
  createCard(card);
 closePopup(popupAddCard);
};
addCardForm.addEventListener('submit', userAddCard); //обработчик формы