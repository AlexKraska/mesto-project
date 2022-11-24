const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const popupEditProfile = document.querySelector('.popup__edit-profile'); //попам редактирования профиля
const popupAddCard = document.querySelector('.popup__add-card'); //попап добавленя карточки
const popupImage = document.querySelector('.popup__image'); //popupImage (просмотра)
const buttonCloseEditProfile = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const buttonCloseAddCard = document.querySelector('#closeButton'); //кнпока закрытия попапа добавления карточки
const sectionCardElements = document.querySelector('.elements'); //выбрали секцию с карточками
const cardTemplate = document.querySelector('#card-template').content; //айдишник шаблона для карточки
const formEditElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
const nameInput = formEditElement.querySelector('.popup__text_type_name'); //поле формы
const jobInput = formEditElement.querySelector('.popup__text_type_job');//еще одно
const profileTitle = document.querySelector('.profile__title'); //куда вставляем имя
const profileSubtitle = document.querySelector('.profile__subtitle'); //куда вставляем профессию
const popupImageCloseButton = popupImage.querySelector('.popup__image-cross');
const popupImageImage = popupImage.querySelector('.popup__image-image');
const popupImageHeading = popupImage.querySelector('.popup__image-heading');

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
};
buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile)
});
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//функция отправки формы
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};
formEditElement.addEventListener('submit', submitEditProfileForm); //обработчик формы

function createCard(el) {
  const cardToCreate = cardTemplate.querySelector('.elements__wrapper').cloneNode(true);
  // наполняем содержимым
  const selectedPhoto = cardToCreate.querySelector('.elements__element');
  const selectedPhotoText = cardToCreate.querySelector('.elements__text');
  
  selectedPhoto.src = el.link;
  selectedPhotoText.alt = el.alt;
  selectedPhotoText.textContent = el.name;

  selectedPhoto.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageImage.src = el.link;
    popupImageHeading.textContent = el.name;
    popupImageImage.alt = el.name;
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
  return cardToCreate;
};

function addCard(el) {
  const cardToAdd = createCard(el);
  sectionCardElements.prepend(cardToAdd);
};

//загржуаем карточки на страницу 
initialCards.reverse().forEach(function (el) {
  addCard(el);
});

popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});

//ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
const formAddCard = document.querySelector('.popup__form_type_add'); //форма добавления карточки
const placeInput = formAddCard.querySelector('.popup__text_type_place');
const linkInput = formAddCard.querySelector('.popup__text_type_link');

function submitAddCardForm(evt) {
  evt.preventDefault();
  const card =
  {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value
  }
  addCard(card);
  closePopup(popupAddCard);
  placeInput.value = '';
  linkInput.value = '';
};
formAddCard.addEventListener('submit', submitAddCardForm); //обработчик формы