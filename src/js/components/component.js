export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Can\'t instantiate BaseComponent, only concrete one.');
    }
    this.element = null;
    this.state = {};
  }

  getTemplate() {
    throw new Error('You have to define template.');
  }

  createElement() {
    const template = this.getTemplate();
    const newElement = document.createElement('template');
    newElement.innerHTML = template;
    return newElement.content.children[0];
  }

  render(container) {
    this.element = this.createElement(this.template);
    this.bind();
    container.append(this.AppView.element);
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this.element.remove();
    this.element = null;
  }
}
