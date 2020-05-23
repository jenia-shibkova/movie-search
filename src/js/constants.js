const CONSTANTS = {
  CODE_ERRORS: {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 401,
    SERVER_ERROR: 500
  },
  RESPONSE_STATUS: {
    GOOD: 'True',
    BAD: 'False'
  },
  ERROR_MESSAGE_NOT_FOUND: 'Movie not found!',
  ERROR_MESSAGE_TOO_MANY: 'Too many results.',
  EMPTY_INPUT_MESSAGE: 'Please, input the movie!',
  INVALID_API_MESSAGE: 'Invalid API key!',
  SERVER_FAIL_MESSAGE: 'Server error!',
  SLIDE_NUMBER: 6,
  SLIDE_NUMBER_SWIPER: 10,
  SCROLL_SLIDE_COUNT: 5,
  SWIPE_SLIDE_COUNT: 9,
  SHIFT_BUTTONS: ['ShiftLeft', 'ShiftRight'],
  UPPERCASE_BUTTONS: ['ShiftRight', 'ShiftLeft', 'CapsLock'],
  NOT_FOR_PRINT_BUTTONS: [
    'CapsLock', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'AltRight', 'MetaLeft', 'ControlLeft', 'ControlRight', 'Enter'
  ],
  NOT_FOR_PRESS_BUTTONS: [
    'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Pause', 'Insert',
    'Home', 'PageUp', 'PageDown', 'End', 'NumLock', 'NumpadDivide', 'NumpadMultiply', 'NumpadSubtract', 'Numpad7',
    'Numpad8', 'Numpad9', 'NumpadAdd', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad0',
    'NumpadDecimal', 'NumpadEnter', 'ContextMenu'
  ],
  DISABLED_VIRTUAL_KEYS: [
    'CapsLock', 'ControlLeft', 'ControlRight', 'ArrowLeft',
    'ArrowLeft', 'ArrowRight', 'Space', 'Enter', 'Delete',
    'Backspace', 'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight'
  ],
  KEY_CODES: {
    ESCAPE: 27,
    ENTER: 13,
    SHIFT: 16,
    CAPS_LOCK: 20,
    TAB: 9,
    ALT: 18,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  },
  IMAGE_PLACEHOLDER: './assets/img/404-image.png',
  SLIDE_MARGIN: 30
};

export default CONSTANTS;
