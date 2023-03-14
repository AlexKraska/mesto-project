2// имя и инфа о себе
export default class UserInfo {
constructor({ name, about, avatar, id }, apiConfig) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
    this.avatar = document.querySelector(avatar);
    this.id = id;
    this._api = apiConfig;
}

getUserInfo() {
  return this._api
  .getProfileData()
  .then((res) => {
      return res;
    })
    .catch((err) => {
        `${err} вот такая ошибочка вышла`;
      });
  }

  renderUserProfile(userData) {
    this.name.textContent = userData.name;
    this.about.textContent = userData.about;
    this.avatar.src = userData.avatar;
  }

  setUserInfo(name, about) {
    return this._api
      .uploadProfileData(name, about)
      .then((userData) => {
        this.name.textContent = userData.name;
        this.about.textContent = userData.about;
      })
      .catch((err) => {
        `${err} упсссс, ошибочка вышла`;
    });
}
      
      setUserAvatar(link) {
    return this._api
      .updateAvatarOnServer(link)
      .then((userData) => {
        this.avatar.src = userData.avatar;
      })
      .catch((err) => {
        `${err} упсссс, ошибочка вышла`;
      });
  }
}
