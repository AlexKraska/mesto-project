import { api, userId } from "./index.js";

export class UserInfo {
    constructor({ name, about, avatar }) { // инфа о пользователе
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
        api.getProfileData()
            .then((userData) => {
                console.log(userData);
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

    setAvatarInfo(link) {
        api.updateAvatarOnServer(link)
            .then((userData) => {
                this.avatar.src = userData.avatar;
            })
    }
};