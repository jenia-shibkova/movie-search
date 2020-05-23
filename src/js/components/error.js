import CONSTANTS from '../constants';
import Component from './component';

export default class Error extends Component {
  constructor(value) {
    super();
    this.value = value;
  }

  getTemplate() {
    let errorElement;

    switch (this.value) {
      case undefined:
        this.value = CONSTANTS.SERVER_FAIL_MESSAGE;
        errorElement = this.getErrorTemplate(this.value);
        return errorElement;

      case CONSTANTS.ERROR_MESSAGE_NOT_FOUND:
        this.value = CONSTANTS.ERROR_MESSAGE_NOT_FOUND;
        errorElement = this.getErrorTemplate(this.value);
        return errorElement;

      case CONSTANTS.CODE_ERRORS.BAD_REQUEST:
        this.value = CONSTANTS.INVALID_API_MESSAGE;
        errorElement = this.getErrorTemplate(this.value);
        return errorElement;

      case '':
        this.value = CONSTANTS.EMPTY_INPUT_MESSAGE;
        errorElement = this.getErrorTemplate(this.value);
        return errorElement;

      default:
        if (this.value >= CONSTANTS.CODE_ERRORS.SERVER_ERROR) {
          this.value = CONSTANTS.SERVER_FAIL_MESSAGE;
          errorElement = this.getErrorTemplate(this.value);
          return errorElement;
        }
        errorElement = this.getErrorWithValueTemplate(this.value);
        return errorElement;
    }
  }

  getErrorWithValueTemplate(value) {
    return `
      <div class="error">
        <p class="error__text">No results were found for '${value}'</p>
      </div>`.trim();
  }

  getErrorTemplate(value) {
    return `
      <div class="error">
        <p class="error__text">${value}</p>
      </div>`.trim();
  }

  createErrorElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
  }
}
