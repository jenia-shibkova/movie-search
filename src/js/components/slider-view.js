import Component from './component';
import Slide from './slide';

export default class SliderView extends Component {
  constructor() {
    super();
    this.element = null;
    this.slider = null;
    this.slide = null;
    this.sliderDescription = null;
    this.placeholder = null;
  }

  getTemplate() {
    return `
      <div class="slider-wrapper">
        <p class="slider__desc">Showing results for <span class="slider__desc-value">"game"</span></p>    
        <ul class="my-slider slider"></ul>        
      </div>`.trim();
  }

  changeSliderDescription(value) {
    this.sliderDescription.innerHTML = `"${value}"`;
  }

  initSliderView() {
    this.slider = document.querySelector('.slider');
  }

  clearSlider() {
    document.querySelector('.slider').innerHTML = '';
  }

  generateSlides(data) {
    const fragment = document.createDocumentFragment();

    data.forEach((el) => {
      const slide = new Slide(el);
      slide.render(fragment);
    });

    return fragment;
  }

  render(container, data) {
    this.element = this.createElement(this.template);

    const slides = this.generateSlides(data);
    this.slider = this.element.querySelector('.slider');
    this.sliderDescription = this.element.querySelector('.slider__desc-value');
    this.slider.append(slides);

    container.append(this.element);
    this.slide = this.slider.querySelector('.slide');
  }
}
