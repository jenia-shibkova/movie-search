import Component from '../components/component';
import Key from './key';

export default class Row extends Component {
  constructor(data) {
    super();
    this.data = data;
  }

  getTemplate() {
    return '<div class="keyboard__row"></div>';
  }

  getRow() {
    const rowContainer = document.createDocumentFragment();

    this.data.forEach((item) => {
      const key = new Key(item);
      const keyElement = key.createElement();

      rowContainer.appendChild(keyElement);
    });

    return rowContainer;
  }

  createRow() {
    const rowElement = this.createElement();
    const rowData = this.getRow();
    rowElement.appendChild(rowData);
    return rowElement;
  }
}
