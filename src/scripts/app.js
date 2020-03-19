import '../styles/main.css';

// npm paketten importeren
import Navigo from 'navigo';
import nunjucks from 'nunjucks';

// controllers importeren
import PagesController from './PagesController';
import TripsController from './TripsController';

const app = {
  init() {
    // locatie van de templates
    nunjucks.configure('templates', {autoescape: true});
    
    // rendering details
    this.$wrapper = document.querySelector('#content');
    this.controllers = {
      trips: new TripsController(this.$wrapper),
      pages: new PagesController(this.$wrapper),
    }

    // router initialiseren
    this.initRouter();
    this.routes();
  },
  initRouter() {
    var root = window.location.origin;
    // var useHash = true; // Defaults to: false
    // #var hash = '#!'; // Defaults to: '#'
    this.router = new Navigo(root, false, false);
    this.router.updatePageLinks();
  },
  routes() {

    this.router
    .on({
      '/': () => {
        this.controllers.pages.home();
      }
    })
    .resolve();
  }
};

app.init();