
export default class UserInfo {
    constructor({ name, about, avatar, id}, apiConfig) { // имя и инфа о себе
        this.name = document.querySelector(name);
        this.about = document.querySelector(about);
        this.avatar = document.querySelector(avatar);
        this.id = id;
        this._api = apiConfig;
        
    }

    getUserId() {
        this.
        this._api.getProfileData()
            .then((data) => {
                return data;
            })
    }


    getUserInfo() {
        this._api.getProfileData()
            .then((data) => {
                return data;
            })
            .catch((err) => {
                `${err} вот такая ошибочка вышла`
            })
    }

    renderUserProfile() {
        this._api.getProfileData()
        .then((userData) => {
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
            this.avatar.src = userData.avatar;
        })
    }

    setUserInfo(name, about) {
        this._api.uploadProfileData(name, about)
        .then((userData) => {
            this.name.textContent = userData.name;
            this.about.textContent = userData.about;
        })
    }

    setUserAvatar(link){
        this._api.updateAvatarOnServer(link)
        .then((userData) => {
            this.avatar.src = userData.avatar;
        })
    }
};

