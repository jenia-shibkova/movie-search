import Component from '../components/component';

export default class Key extends Component {
  constructor(data) {
    super();
    this.name = data.name;
    this.value = data.value;
  }

  getTemplate() {
    return `
      <div id="${this.name}" class="key ${this.name}">
        <span class="key-${this.name} en">
          <span class="${this.name} down">${this.value[0][0]}</span>
          <span class="${this.name} up off">${this.value[0][1]}</span>
        </span>
        <span class="key-${this.name} ru off">
          <span class="${this.name} down">${this.value[1][0]}</span>
          <span class="${this.name} up off">${this.value[1][1]}</span>
        </span>
      </div>`.trim();
  }
}
