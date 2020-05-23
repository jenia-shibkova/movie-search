import Component from './component';
import CONSTANTS from '../constants';

export default class ModalWidow extends Component {
  constructor(data) {
    super();
    // console.log(data)
    this.data = data;
    this.title = data.Title;
    this.rating = data.imdbRating;
    this.posterSrc = data.Poster;
    this.date = data.Released;
    this.genre = data.Genre;
    this.imdbID = data.imdbID;
    this.plot = data.Plot;
    this.actors = data.Actors;
    this.awards = data.Awards;
    this.writer = data.Writer;
    this.director = data.Director;
    this.type = data.Type;
    this.country = data.Country;
    this.element = null;
    this.modal = null;
    this.moreContentLink = null;
    this.placeholder = CONSTANTS.IMAGE_PLACEHOLDER;
    this.image = null;
  }

  getTemplate() {
    return `
      <div class="modal">
        <div class='modal__content'> 
          <button class="modal__close button" type="button">Close</button>
          <h2 class="modal__main-title">About:</h2>
          <div class="modal__row">
            <p class="modal__title">Title</p>
            <p class="modal__desc">${this.title}</p>
          </div>
           <div class="modal__row">
            <p class="modal__title">Country</p>
            <p class="modal__desc">${this.country}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Plot</p>
            <p class="modal__desc modal__desc--plot">${(this.plot === 'N/A') ? '...' : this.plot}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Type</p>
            <p class="modal__desc">${this.type}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Director</p>
            <p class="modal__desc">${(this.director === 'N/A') ? '...' : this.director}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Writer</p>
            <p class="modal__desc modal__desc--writer">${this.writer}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Actors</p>
            <p class="modal__desc">${this.actors}</p>
          </div>
          <div class="modal__row">
            <p class="modal__title">Awards</p>
            <p class="modal__desc">${(this.awards === 'N/A') ? '...' : this.awards}</p>
          </div>
        </div>
      </div>`.trim();
  }


  bind() {
    this.buttonClose.addEventListener('click', this.closeModalWindow.bind(this));
    document.addEventListener('keydown', this.onKeyEscPress.bind(this));
  }

  onKeyEscPress(event) {
    const { keyCode } = event;

    if (keyCode === CONSTANTS.KEY_CODES.ESCAPE) {
      this.closeModalWindow();
    }
  }

  closeModalWindow() {
    this.element.remove();
  }

  render() {
    this.element = this.createElement();
    this.buttonClose = this.element.querySelector('.modal__close');

    this.bind();
    document.body.append(this.element);
  }
}
