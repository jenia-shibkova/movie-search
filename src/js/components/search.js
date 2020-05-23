import Component from './component';
import Keyboard from '../keyboard/keyboard';

export default class AppView extends Component {
  constructor() {
    super();
    this.element = null;
    this.form = null;
    this.input = null;
    this.buttonSearch = null;
    this.buttonClearInput = null;
    this.keyboardOpenButton = null;
    this.progressBar = null;
    this.keyboard = new Keyboard();
  }

  getTemplate() {
    return `
    <div class="search">
      <form class="search__form container">
        <div class="search__wrapper">        
          <input class="search__input" type="text" placeholder="Search movie" autofocus autocomplete="off">        
          <span data-name="Clear" class="button search__clear-btn tooltip"></span>
          <span data-name="Keyboard" class="button search__keyboard-btn tooltip"></span>
          <button type="submit" class="button search__search-btn" aria-label="submit">Search</button>
        </div>
      </form>       
      <div class="progress-bar">
        <span class="bar">
          <span class="progress"></span>
        </span>
      </div>   
    </div>`.trim();
  }

  toggleProgressBar() {
    this.progressBar.classList.toggle('none');
  }

  clearSearchInputValue() {
    this.input.value = '';
  }

  getInputValue() {
    return this.input.value.trim();
  }

  subscribeOnInputChange(func) {
    this.input.addEventListener('input', () => {
      func(this.input.value);
    });
  }

  subscribeOnSearchInputChange(func) {
    this.form.addEventListener('submit', () => {
      event.preventDefault();
      func(this.input.value);
    });
  }

  subscribeOnSearchInputClear(func) {
    this.buttonClearInput.addEventListener('click', () => {
      this.clearSearchInputValue();
      func();
    });
  }

  subscribeOnKeyboardOpenButtonClick(func) {
    this.keyboardOpenButton.addEventListener('click', () => {
      func();
    });
  }

  render(container) {
    this.element = this.createElement(this.template);

    this.form = this.element.querySelector('.search__form');
    this.input = this.element.querySelector('input');
    this.buttonSearch = this.element.querySelector('.search__search-btn');
    this.buttonClearInput = this.element.querySelector('.search__clear-btn');
    this.keyboardOpenButton = this.element.querySelector('.search__keyboard-btn');
    this.progressBar = this.element.querySelector('.progress-bar');

    container.append(this.element);
  }
}
