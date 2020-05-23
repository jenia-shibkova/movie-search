import Component from './component';
import CONSTANTS from '../constants';

export default class Slide extends Component {
  constructor(data) {
    super();
    this.title = data.Title;
    this.rating = data.imdbRating;
    this.posterSrc = data.Poster;
    this.date = data.Released;
    this.genre = data.Genre;
    this.imdbID = data.imdbID;
    this.element = null;
    this.moreContentLink = null;
    this.placeholder = CONSTANTS.IMAGE_PLACEHOLDER;
    this.image = null;
  }

  getTemplate() {
    return `
      <li class="slide">
        <div class="slide__inner-wrapper">
          <div class="slide__image-wrapper">
            <span class="slide__film-rating">${(this.rating === 'N/A') ? '...' : this.rating}</span>
            <img class="slide__image" src="${(this.posterSrc === 'N/A') ? this.placeholder : this.posterSrc}" width="234" height="360"> 
          </div>                             
          <a href="https://www.imdb.com/title/${this.imdbID}/videogallery" target="_blank" class="slide__link">
            <h2 class="slide__film-title">${this.title}</h2>
          </a>
          <p class="slide__film-desc">
            <span class="slide__date">${(this.date === 'N/A') ? '...' : this.date}</span>,<span> ${this.genre}</span>
          </p>
          <span class="slide__film-info" id="${this.imdbID}">More</span>
        </div> 
      </li>`.trim();
  }

  render(container) {
    this.element = this.createElement(this.template);

    this.cardLink = this.element.querySelector('.search__form');
    this.input = this.element.querySelector('.search__input'); this.element.querySelector('.search__input');
    this.buttonSearch = this.element.querySelector('.search__search-btn');
    this.moreContentLink = this.element.querySelector('.slide__film-info');
    this.image = this.element.querySelector('.slide__image-wrapper');

    container.append(this.element);
  }
}
