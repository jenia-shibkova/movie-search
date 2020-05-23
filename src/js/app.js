import Component from './components/component';
import AppView from './components/app-view';
import SliderView from './components/slider-view';
import AppModel from './app-model';
import SliderModel from './slider-model';
import Search from './components/search';
import Keyboard from './keyboard/keyboard';
import ModalWidow from './components/modal-window';
import Error from './components/error';
import CONSTANTS from './constants';
import UTILS from './utils';

export default class App extends Component {
  constructor() {
    super();
    this.appView = new AppView();
    this.search = new Search();
    this.appModel = new AppModel();
    this.sliderView = new SliderView();
    this.sliderModel = new SliderModel();
    this.keyboard = new Keyboard();
    this.page = 1;
    this.hasNextPage = true;
    this.inputValue = null;
    this.slideIndex = 0;
    this.currentIndex = 3;
    this.currentData = null;
    this.currentValue = null;
    this.startX = 0;
    this.endX = 0;
  }

  async checkLangValue(value) {
    if (UTILS.isCyrillic(value)) {
      const englishValue = await this.appModel.getTranslate(value);
      return englishValue;
    }
    return value;
  }

  async getInputValue(value) {
    let response;
    this.currentValue = value;

    if (this.currentValue) {
      this.search.toggleProgressBar();
      this.currentValue = await this.checkLangValue(this.currentValue);

      try {
        response = await this.appModel.getByPageRequest(this.currentValue);

        const fullDefaultData = await this.appModel.getFullFilmData(response);
        const newSlides = this.sliderView.generateSlides(fullDefaultData);

        this.changeSliderContent(newSlides);
        this.sliderView.changeSliderDescription(this.currentValue);
        this.hasNextPage = true;
        this.removeError();
        this.search.toggleProgressBar();
        this.inputValue = this.currentValue;
      } catch (e) {
        if (response.Error === CONSTANTS.ERROR_MESSAGE_TOO_MANY) {
          this.throwError(this.currentValue);
        } else {
          this.throwError(response.Error);
        }

        this.search.toggleProgressBar();
      }
    } else {
      this.throwError(this.currentValue);
    }

    this.closeKeyboard();
  }

  removeError() {
    if (this.appView.errorElement) {
      this.appView.errorElement.remove();
      this.appView.errorElement = null;
    }
  }

  async getNextPageRequestData() {
    this.page += 1;
    let response;
    this.inputValue = await this.checkLangValue(this.inputValue);

    if (this.hasNextPage) {
      try {
        response = await this.appModel.getByPageRequest(this.inputValue, this.page);

        const fullDefaultData = await this.appModel.getFullFilmData(response);
        const newSlides = this.sliderView.generateSlides(fullDefaultData);
        return newSlides;
      } catch (e) {
        if (response === undefined) {
          this.throwError(response);
        } else {
          this.throwError(response.Error);
        }

        this.hasNextPage = false;
        this.page -= 1;
      }
    }
  }

  changeSliderContent(newSlides) {
    this.destroySlider();
    this.sliderView.clearSlider();
    this.sliderView.slider.append(newSlides);
    this.sliderModel.sliderInit();
  }

  async getDefaultRequest() {
    this.inputValue = 'game';
    let response = await this.appModel.getOMDbRequest(this.inputValue);

    if (response.Response === CONSTANTS.RESPONSE_STATUS.GOOD) {
      this.currentData = await this.appModel.getFullFilmData(response);
      this.sliderView.render(this.appView.content, this.currentData);
      this.sliderModel.sliderInit();

      this.initSliderScrollEvents();
      this.initTouchScreenEvents();
    }

    if (response.status === CONSTANTS.CODE_ERRORS.BAD_REQUEST
      || response.status >= CONSTANTS.CODE_ERRORS.SERVER_ERROR) {
      this.throwError(response.status);
    }

    this.search.toggleProgressBar();
  }

  throwError(value) {
    if (this.appView.errorElement) {
      this.appView.errorElement.remove();
    }
    const error = new Error(value);
    this.appView.errorElement = error.createElement();
    this.appView.header.append(this.appView.errorElement);
  }

  getNextPage() {
    this.sliderModel.sliderInit();
    this.search.toggleProgressBar();
  }

  async getNextPageInit(newSlides) {
    this.destroySlider();
    this.sliderView.slider.append(newSlides);

    this.sliderModel.increaseActiveSlideNumber();
    this.getNextPage();
  }

  async getNextPageSwiperInit(newSlides) {
    this.destroySlider();
    this.sliderView.slider.append(newSlides);

    this.sliderModel.increaseSwiperActiveSlideNumber();
    this.getNextPage();
  }

  onClickHandler({ target }) {
    if (target.classList.contains('slide__film-info')) {
      this.getModalWindow(target.id);
    }

    if (!this.hasNextPage) {
      return;
    }

    if (target.dataset.controls === 'next') {
      if (this.appView.errorElement) {
        this.appView.errorElement.remove();
      }

      this.onButtonNextClick();
    }
  }

  async getModalWindow(id) {
    const data = await this.appModel.getFilmData(id);
    const modal = new ModalWidow(data);
    modal.render();
  }

  onButtonNextClick() {
    this.slideIndex += 1;

    if (this.slideIndex % CONSTANTS.SCROLL_SLIDE_COUNT === 0) {
      this.nextPageInit();
    }
  }

  async nextPageInit() {
    this.search.toggleProgressBar();
    const newSlides = await this.getNextPageRequestData();
    this.getNextPageInit(newSlides);
  }

  async nextPageSwiperInit() {
    this.search.toggleProgressBar();
    const newSlides = await this.getNextPageRequestData();
    this.getNextPageSwiperInit(newSlides);
  }

  initSliderScrollEvents() {
    let slideWidth = this.sliderView.slide.clientWidth + CONSTANTS.SLIDE_MARGIN;
    let index = CONSTANTS.SCROLL_SLIDE_COUNT;

    document.addEventListener('mousedown', (event) => {
      this.startX = event.clientX;
    });

    document.addEventListener('mouseup', (event) => {
      this.endX = event.clientX;

      if (this.startX > this.endX) {
        const offset = this.startX - this.endX;
        const slideCount = Math.ceil(offset / slideWidth);
        this.currentIndex += slideCount;

        if (this.currentIndex >= index) {
          this.nextPageInit();
          index += CONSTANTS.SCROLL_SLIDE_COUNT;
        }
      }
    });
  }

  initTouchScreenEvents() {
    let index = 0;

    document.addEventListener('touchstart', (event) => {
      this.startX = event.changedTouches[0].clientX;
    });

    document.addEventListener('touchend', (event) => {
      this.endX = event.changedTouches[0].clientX;

      if (this.startX > this.endX) {
        index += 1;

        if (index % CONSTANTS.SWIPE_SLIDE_COUNT === 0) {
          this.nextPageSwiperInit();
        }
      }
    });
  }

  async scrollEventGetNewPage() {
    this.search.toggleProgressBar();
    const newSlides = await this.getNextPageRequestData();
    this.getNextPageInit(newSlides);
  }

  async touchEventGetNewPage() {
    this.search.toggleProgressBar();
    const newSlides = await this.getNextPageRequestData();
    this.getNextPageSwiperInit(newSlides);
  }

  destroySlider() {
    this.sliderModel.slider.destroy();
    this.sliderView.initSliderView();
  }

  clearState() {
    this.inputValue = '';
    this.search.input.value = '';
    this.keyboard.state.result = '';
    this.page = 1;
    this.hasNextPage = true;
    this.slideIndex = 0;
  }

  changeInputValue(value) {
    if (this.inputValue) {
      this.inputValue = `${this.inputValue}${value}`;
    }
    if (this.search.input.value) {
      this.search.input.value = `${this.search.input.value}${value}`;
    }

    this.inputValue = value;
    this.search.input.value = value;
    this.removeError();
    this.page = 1;
    this.hasNextPage = true;
  }

  toggleKeyboard() {
    this.keyboard.element.classList.toggle('none');
  }

  toggleButtonNone(button) {
    button.classList.toggle('none');
  }

  removeNone(elem) {
    elem.classList.remove('none');
  }

  closeKeyboard() {
    if (!this.keyboard.element.classList.contains('none')) {
      this.keyboard.element.classList.add('none');
    }
  }

  async start() {
    this.appView.render(document.body);
    this.search.render(this.appView.content);
    this.keyboard.render(this.search.element);

    this.search.subscribeOnSearchInputChange(this.getInputValue.bind(this));
    this.search.subscribeOnSearchInputClear(this.clearState.bind(this));
    this.search.subscribeOnInputChange(this.removeError.bind(this));
    this.search.subscribeOnKeyboardOpenButtonClick(this.toggleKeyboard.bind(this));

    this.keyboard.subscribeOnKeyboardEvents(this.changeInputValue.bind(this));
    this.keyboard.subscribeOnEnterKeyClick(this.getInputValue.bind(this));

    await this.getDefaultRequest();

    document.addEventListener('click', this.onClickHandler.bind(this));
  }
}
