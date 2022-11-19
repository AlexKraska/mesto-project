const cardShablon = document.querySelector('#cardShablon').content; //айдишник шаблона для карточки
const cardElements = document.querySelector('.elements'); //выбрали секцию с карточками

const overview = document.querySelector('.overview'); //попап overview (просмотра)
const overviewCloseButton = overview.querySelector('.overview__cross');

const formElement = document.querySelector('.popup__form_type_edit'); // форма редактирования профиля
let nameInput = formElement.querySelector('.popup__text_type_name'); //поле формы
let jobInput = formElement.querySelector('.popup__text_type_job');//еще одно
let $h1 = document.querySelector('.profile__title'); //куда вставляем имя
let $h2 = document.querySelector('.profile__subtitle'); //куда вставляем профессию



function handleFormSubmit(evt) { //функция отправки формы
    evt.preventDefault(); 
$h1.textContent = nameInput.value;
$h2.textContent = jobInput.value;
    closePopup ();
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

//загржуаем карточки на страницу
    initialCards.forEach(function(el) {
        const cardFirst = cardShablon.querySelector('.elements__wrapper').cloneNode(true); //клонировали содержимое тега template

        cardFirst.querySelector('.elements__element').src = el.link;
        cardFirst.querySelector('.elements__element').alt = el.alt;
        cardFirst.querySelector('.elements__text').textContent = el.name;
        
        cardElements.append(cardFirst);

        const bin = cardFirst.querySelector('.elements__bin'); //удаление карточек
        bin.addEventListener('click', function() {
            cardFirst.remove();
        });

        let selectedPhoto = cardFirst.querySelector('.elements__element'); //выбираем карточку для overview

        selectedPhoto.addEventListener('click', function() {
            overview.classList.add('overview_opened'); //открываем попап overview для просмотра карточки
                // выбираем нужный src, alt и heading для overview каждой картоки
            overview.querySelector('.overview__image').src = cardFirst.querySelector('.elements__element').src;
            overview.querySelector('.overview__image').alt = cardFirst.querySelector('.elements__element').alt;
            overview.querySelector('.overview__heading').textContent = cardFirst.querySelector('.elements__text').textContent;

            overviewCloseButton.addEventListener('click', function() {
                overview.classList.remove('overview_opened');
            })
        });

    });

    
const addCardForm = document.querySelector('.popup__form_type_add'); //форма добавления карточки

let placeInput = addCardForm.querySelector('.popup__text_type_place'); 
let linkInput = addCardForm.querySelector('.popup__text_type_link');

function handleFormSubmitAddCard(evt) { //ДОБАВЛЕНИЕ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
    evt.preventDefault(); 
    const cardTheNew = cardShablon.querySelector('.elements__wrapper').cloneNode(true);
    cardTheNew.querySelector('.elements__text').textContent = placeInput.value;
    cardTheNew.querySelector('.elements__element').src = linkInput.value;
    cardTheNew.querySelector('.elements__element').alt = placeInput.value;
    cardElements.prepend(cardTheNew); // вставим новую карточку в начало массива

    closePopup ();

    const heart = cardTheNew.querySelector('.elements__heart'); //лайки пользовательским карточкам
    heart.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('elements__heart_active');
     });

     const bin = cardTheNew.querySelector('.elements__bin'); //удаление пользовательских карточек
        bin.addEventListener('click', function() {
            cardTheNew.remove();
        });

        let selectedPhoto = cardTheNew.querySelector('.elements__element'); //выбираем карточку для overview

        //открываем попап overview
        selectedPhoto.addEventListener('click', function() {
            
            overview.classList.add('overview_opened'); 

            overview.querySelector('.overview__image').src = cardTheNew.querySelector('.elements__element').src;
            overview.querySelector('.overview__image').alt = cardTheNew.querySelector('.elements__element').alt;
            // выбираем нужный src, alt и heading для overview каждой картоки
            overview.querySelector('.overview__heading').textContent = cardTheNew.querySelector('.elements__text').textContent;

            overviewCloseButton.addEventListener('click', function() {
                overview.classList.remove('overview_opened');
            })
        });

};

addCardForm.addEventListener('submit', handleFormSubmitAddCard); //обработчик формы

const heart = cardElements.querySelectorAll('.elements__heart'); //лайки изначальым карточкам

heart.forEach(function(card) {
    card.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('elements__heart_active');
     })
});