import { api } from "./index.js";

export class UserInfo {
    constructor({ name, about, avatar}) { // имя и инфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
        this.avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        api.getProfileData().then((data) => {
            return data;
        });
    }

    loadUserInfo() {
        api.getProfileData().then((userData) => {
            console.log(userData)
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
            this.avatar.src = userData.avatar;
        });
    }


    setUserInfo(name, about) {
        api.uploadProfileData(name, about)
        .then((userData) => {
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
        })
    }
};