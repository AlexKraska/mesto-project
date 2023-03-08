import { api } from "./index.js";

export class UserInfo2 {
    constructor({ name, about, avatar }) { // имя и иинфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
        this.avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        api.getProfileData().then((data) => {
            return data;
        });
    }

    // принимает новые данные пользователя,
    // отправляет их на сервер и добавляет их на страницу.
    setUserInfo(name, about, avatar) {
        api.uploadProfileData(name, about, avatar)
        .then((userData) => {
            console.log(userData);
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
            this.avatar = userData.avatar;
        })
    }
};