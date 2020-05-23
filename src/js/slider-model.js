import CONSTANTS from './constants';

export default class SliderModel {
  constructor() {
    this.slider = null;
    this.activeSlideIndex = 0;
  }

  changeSliderContent() {
    this.slider.destroy();
  }

  sliderInit() {
    this.slider = tns({
      container: '.my-slider',
      controls: true,
      items: 1,
      slideBy: 1, // 'page'
      mode: 'carousel',
      loop: true,
      speed: 600,
      center: false,
      mouseDrag: true,
      swipeAngle: false,
      controlsPosition: 'bottom',
      nav: false,
      startIndex: this.activeSlideIndex,
      responsive: {
        640: {
          items: 2
        },
        900: {
          items: 3
        },
        1100: {
          items: 4
        }
      },
      preventScrollOnTouch: 'force'
    });

    this.slider.play();
  }

  increaseSlideIndex() {
    this.activeSlideIndex += CONSTANTS.SLIDE_NUMBER;
  }

  increaseSwiperSlideIndex() {
    this.activeSlideIndex += CONSTANTS.SLIDE_NUMBER_SWIPER;
  }

  increaseActiveSlideNumber() {
    this.increaseSlideIndex();
  }

  increaseSwiperActiveSlideNumber() {
    this.increaseSwiperSlideIndex();
  }
}
