import { CATFACT_URL } from "./constants";

class FactApi {
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

  getFact() {
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

const factApi = new FactApi({
  url: CATFACT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default factApi;