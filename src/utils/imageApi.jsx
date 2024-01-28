import { CATIMAGE_URL } from "./constants";

class ImageApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _returnPromiseStatus(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }

  getImage() {
    return fetch(`${this._url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }
}

const imageApi = new ImageApi({
  url: CATIMAGE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default imageApi;
