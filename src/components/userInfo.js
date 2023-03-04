import { api } from "./index.js";
import { Api } from './api.js';

export class UserInfo2 {
    constructor({ name, about /*, avatar */}) { // имя и иинфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
        //this.avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        //const getDataFromProfile = new
        api.getProfileData().then((data) => {
            return data;
        });
    }

    // принимает новые данные пользователя,
    // отправляет их на сервер и добавляет их на страницу.
    setUserInfo(name, about/*, avatar*/) {
        api.uploadProfileData(name, about).then((userData) => {
            console.log(userData);
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
           // this.avatar.src = userData.avatar;
        })
    }
}

// Тест: создаем класс и с помощью его метода обновляем и выводим на странице имя и профессию пользователя

//profile.setUserInfo("Петр Липатов", "Исследователь океанов")