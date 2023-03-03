import { Api, api } from "./api.js";

export class UserInfo2 {
  constructor({ name, about }) { // имя и иинфа о себе
    this.nameElement = document.querySelector(name);
    this.aboutElement = document.querySelector(about);
  }

  getUserInfo() {
    api.getProfileData().then((userData) => {
      return(userData);
    });
  }

  // принимает новые данные пользователя,
  // отправляет их на сервер и добавляет их на страницу.
  setUserInfo(name, about) {
    api.uploadProfileData(name, about).then((userData) => {
        this.nameElement.textContent = userData.name;
        this.aboutElement.textContent = userData.about;
    })
  }
}

// Тест: создаем класс и с помощью его метода обновляем и выводим на странице имя и профессию пользователя

const sels = {name: ".profile__title", about:".profile__subtitle"};
const profile = new UserInfo2(sels);
profile.setUserInfo("Петр Липатов", "Исследователь океанов")