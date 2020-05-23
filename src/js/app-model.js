import CONSTANTS from './constants';

export default class AppModel {
  constructor() {
    this.YANDEX_TRANSLATE_API_TOKEN = 'trnsl.1.1.20191214T165926Z.53120b6e4018dc60.51e313a3dc913c522f5c26a8ed5404e3e968f5ff';
    this.OMDb_API_KEY = '4f8152af';
    this.BASE_OMDb_URL = 'https://www.omdbapi.com/';
  }

  async getOMDbRequest(value) {
    const targetUrl = `${this.BASE_OMDb_URL}?s=${value}&apikey=${this.OMDb_API_KEY}`;
    const response = await fetch(targetUrl);

    if (response.status === CONSTANTS.CODE_ERRORS.OK) {
      const data = await response.json();
      return data;
    }

    if (response.status === CONSTANTS.CODE_ERRORS.BAD_REQUEST) {
      return response;
    }
  }

  async getByPageRequest(value, page = 1) {
    const targetUrl = `${this.BASE_OMDb_URL}?s=${value}&page=${page}&apikey=${this.OMDb_API_KEY}`;

    const response = await fetch(targetUrl);

    if (response.status === CONSTANTS.CODE_ERRORS.OK) {
      const data = await response.json();
      return data;
    }
    return response;
  }

  getImdbIDs(data) {
    return data.Search.map((el) => el.imdbID);
  }

  async getFilmData(id) {
    const targetUrl = `${this.BASE_OMDb_URL}?i=${id}&apikey=${this.OMDb_API_KEY}`;
    const response = await fetch(targetUrl);
    const fullData = await response.json();
    return fullData;
  }

  async getFullFilmData(data) {
    const filmIDs = this.getImdbIDs(data);

    return Promise.all(filmIDs.map((id) => this.getFilmData(id)));
  }

  async getTranslate(text, lang = 'en') {
    const baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    const targetUrl = `${baseUrl}?key=${this.YANDEX_TRANSLATE_API_TOKEN}&text=${text}&lang=${lang}&format=plain`;

    let data;
    const response = await fetch(targetUrl);
    data = await response.json();

    if (data.code === CONSTANTS.CODE_ERRORS.OK) {
      return data.text[0];
    }
  }
}
