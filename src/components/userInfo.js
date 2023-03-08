import { api } from "./index.js";

export class UserInfo {
    constructor({ name, about}) { // имя и инфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
    }

    getUserInfo() {
        api.getProfileData().then((data) => {
            return data;
        });
    }

    loadUserInfo() {
        api.getProfileData().then((userData) => {
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
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