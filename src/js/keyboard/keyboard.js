import DATA from './data';
import Row from './row';
import Component from '../components/component';
import UTILS from '../utils';
import CONSTANTS from '../constants';

export default class Keyboard extends Component {
  constructor() {
    super();
    this.state = {
      ru: false,
      uppercase: false,
      result: '',
      pressed: new Set()
    };
    this.element = null;
    this.allKeys = null;
    this.buttonEnLang = null;
    this.buttonRuLang = null;
    this.capsLockButton = null;
    this.ctrlButton = null;
    this.downKeys = null;
    this.upKeys = null;
    this.input = null;
    this.enKeys = null;
    this.ruKeys = null;
    this.enterButton = null;
  }

  getTemplate() {
    return `
      <div class="wrapper none"> 
        <div class="switcher">
          <button id="en" class="button button__lang button__lang--en button__lang--active" type="button">En</button>
          <button id="ru" class="button button__lang button__lang--ru" type="button">Ru</button>
        </div>       
        <div class="keyboard"></div>
      </div>`.trim();
  }

  createKeyboard() {
    const keyboardElement = this.createElement();
    const fragment = document.createDocumentFragment();

    DATA.forEach((el) => {
      const row = new Row(el);
      fragment.append(row.createRow());
    });

    const keyboard = keyboardElement.querySelector('.keyboard');
    keyboard.append(fragment);

    return keyboardElement;
  }

  render(container) {
    this.element = this.createKeyboard();

    this.initKeyboardElements(this.element);
    container.append(this.element);
  }

  initKeyboardElements(element) {
    this.allKeys = element.querySelectorAll('.key');
    this.buttonEnLang = element.querySelector('.button__lang--en ');
    this.buttonRuLang = element.querySelector('.button__lang--ru');
    this.capsLockButton = element.querySelector('.CapsLock');
    this.ctrlButton = element.querySelector('.ControlLeft');
    this.downKeys = element.querySelectorAll('.down');
    this.upKeys = element.querySelectorAll('.up');
    this.enKeys = element.querySelectorAll('.en');
    this.ruKeys = element.querySelectorAll('.ru');
    this.enterButton = element.querySelector('.Enter');
  }

  onClickHandler({ target }) {
    const activeElem = document.querySelector('.key--active');

    if (!this.input) {
      this.input = document.querySelector('input');
    }

    if (target.classList.contains('button__lang')) {
      this.switchActiveLang();
      this.switchLang();
    }

    if (!target.classList.contains('key')) {
      return;
    }

    if (CONSTANTS.SHIFT_BUTTONS.includes(target.id)) {
      this.state.pressed.add(target.id);
    }

    if (!CONSTANTS.NOT_FOR_PRINT_BUTTONS.includes(target.id)) {
      this.printCharInit(target);
    }

    if (target.classList.contains('key')) {
      target.classList.add('key--active');
    }

    if (this.state.pressed.has('ShiftLeft') || this.state.pressed.has('ShiftRight')) {
      if (activeElem.id === 'CapsLock' || target.id === 'CapsLock') {
        return;
      }

      this.shiftButtonClickInit(target);
    }

    if (CONSTANTS.UPPERCASE_BUTTONS.includes(target.id)) {
      if (activeElem.id === 'CapsLock' && CONSTANTS.SHIFT_BUTTONS.includes(target.id)) {
        return;
      }

      this.switchUppercase(target);
    }
  }

  switchActiveLang() {
    this.buttonEnLang.classList.toggle('button__lang--active');
    this.buttonRuLang.classList.toggle('button__lang--active');
  }

  printCharInit(target) {
    const char = target.innerText;
    const startCursorValue = this.input.selectionStart;
    const currentValue = this.input.value;
    const subStr = currentValue.substr(startCursorValue, 1);
    this.input.focus();

    switch (target.id) {
      case 'Enter':
        this.state.result = `${currentValue}`;
        break;
      case 'Space':
        this.state.result = `${currentValue} `;
        break;
      case 'Delete':
        this.state.result = `${currentValue.replace(subStr, '')}`;
        break;
      case 'Backspace':
        this.state.result = `${currentValue.replace(/.$/, '')}`;
        break;
      default:
        this.state.result = `${currentValue}${char}`;
    }
  }

  shiftButtonClickInit(target) {
    if (!CONSTANTS.DISABLED_VIRTUAL_KEYS.includes(target.id)) {
      UTILS.switcher(this.upKeys, this.downKeys);
      this.state.pressed = new Set();

      document.querySelector('.key--active').classList.remove('key--active');
    }
  }

  switchUppercase(target) {
    if (this.state.uppercase) {
      this.state.uppercase = false;
      target.classList.remove('key--active');
    } else {
      this.state.uppercase = true;
      target.classList.add('key--active');
    }

    UTILS.switcher(this.upKeys, this.downKeys);
  }

  onMouseLeaveHandler({ target }) {
    if (CONSTANTS.UPPERCASE_BUTTONS.includes(target.id)) {
      if (this.state.uppercase && target.id === 'CapsLock') {
        return;
      }
      target.classList.remove('key--active');
    } else if (target.classList.contains('key')) {
      target.classList.remove('key--active');
    }
  }

  onKeyDownHandler(event) {
    const { code, key } = event;

    this.input = document.querySelector('input');
    this.input.focus();

    if (!CONSTANTS.NOT_FOR_PRESS_BUTTONS.includes(code)) {
      this.state.pressed.add(code);
    } else {
      return;
    }

    if (key === 'AltGraph') {
      this.ctrlButton.classList.remove('key--active');
    }

    const element = this.element.querySelector(`.${code}`);

    if (element) {
      element.classList.add('key--active');
    }

    if (element.classList.contains('CapsLock')) {
      if (this.state.uppercase) {
        this.state.uppercase = false;
        element.classList.remove('key--active');
      } else {
        this.state.uppercase = true;
        element.classList.add('key--active');
      }

      UTILS.switcher(this.upKeys, this.downKeys);
    }

    if (this.state.pressed.has('ShiftLeft') && this.state.pressed.has('AltLeft')) {
      this.input.focus();
      this.switchLang();
      this.switchActiveLang();
    }

    if (this.state.pressed.has('ShiftLeft') || this.state.pressed.has('ShiftRight')) {
      this.shiftButtonPressInit(code);
    }
  }

  shiftButtonPressInit(key) {
    if (key === 'CapsLock') {
      return;
    }

    if (!CONSTANTS.DISABLED_VIRTUAL_KEYS.includes(key)) {
      UTILS.switcher(this.upKeys, this.downKeys);
      this.state.pressed = new Set();
    }
  }

  switchLang() {
    if (this.state.en) {
      this.state.en = false;
    } else {
      this.state.en = true;
    }
    UTILS.switcher(this.enKeys, this.ruKeys);
  }

  onKeyUpHandler(event) {
    const { code } = event;
    const element = document.querySelector(`.${code}`);
    this.input = document.querySelector('input');

    if (this.state.pressed.size === 0) {
      return;
    }

    if (!element) {
      return;
    }

    if (element.classList.contains('key--active') && !element.classList.contains('CapsLock')) {
      element.classList.remove('key--active');
    }

    this.state.pressed.delete(event.code);
    this.input.focus();
  }

  subscribeOnEnterKeyClick(func) {
    this.enterButton.addEventListener('mousedown', () => {
      func(this.state.result);
    });
  }

  subscribeOnKeyboardEvents(func) {
    this.element.addEventListener('click', (event) => {
      this.onClickHandler(event);
      func(this.state.result);
    });

    document.addEventListener('mousedown', this.onMouseLeaveHandler.bind(this));

    this.allKeys.forEach((button) => {
      button.addEventListener('mouseleave', this.onMouseLeaveHandler.bind(this));
    });

    document.addEventListener('keydown', this.onKeyDownHandler.bind(this));
    document.addEventListener('keyup', this.onKeyUpHandler.bind(this));
  }
}
