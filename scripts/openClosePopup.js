//ОТКРЫТИЕ  ЗАКРЫТИЕ ПОПАПОВ

const editPopupButton = document.querySelector('.profile__button'); //кнопка открытия попапа редактирования
const addPopupButton = document.querySelector('.profile__button-plus'); //кнопка открытия попапа добавления
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('#popup');
const popupClose = document.querySelector('.popup__cross'); //кнпока закрытия попапа редактирования
const popupCloseAdd = document.querySelector('#closeButton')



function openPopup() {
    popup.classList.add('popup_opened'); 
};
editPopupButton.addEventListener('click', function () {
    openPopup()
});

function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
};
addPopupButton.addEventListener('click', function () {
    openPopupAdd()
});

function closePopup () {
    popup.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
};
popupClose.addEventListener('click', function () {
    closePopup()
});

popupCloseAdd.addEventListener('click', function () {
    closePopup()
});