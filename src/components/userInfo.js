import { api } from "./index.js";

export default class UserInfo {
    constructor({ name, about, avatar }) { // имя и инфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
        this.avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        api.getProfileData()
            .then((data) => {
                return data;
            })
            .catch((err) => {
                `${err} вот такая ошибочка вышла`
            })
    }
    
    setUserInfo(name, about) {
        api.uploadProfileData(name, about)
        .then((userData) => {
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
        })
    }
};