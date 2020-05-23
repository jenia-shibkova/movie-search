import Component from './component';

export default class AppView extends Component {
  constructor() {
    super();
    this.element = null;
    this.content = null;
    this.slider = null;
    this.header = null;
    this.errorElement = null;
  }

  getTemplate() {
    return `<div class="app"> 
      <header class="header">    
        <h1 class="header__title container">MovieSearch</h1>
      </header> 
      <main class="content"></main> 
      <footer class="footer">
        <div class="footer__wrapper container">
          <a href="https://rs.school/" class="footer__link footer__link--rss" target="_blank">
            RS School 2020q1
          </a>      
          <a href="https://github.com/jenia-shibkova" class="footer__link footer__link--github" target="_blank">
            my github
          </a> 
        </div>
      </footer></div>`.trim();
  }

  render(container) {
    this.element = this.createElement(this.template);
    this.content = this.element.querySelector('.content');
    this.header = this.element.querySelector('.header');

    container.append(this.element);
  }
}
