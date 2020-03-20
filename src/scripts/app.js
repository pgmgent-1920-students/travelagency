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
    
    // router initialiseren
    this.initRouter(); // configuratie van de router

    this.controllers = {
      trips: new TripsController(this.$wrapper, this.router),
      pages: new PagesController(this.$wrapper),
    }


    this.routes(); // initialiseren we de routes

  },
  initRouter() {
    var root = window.location.origin;
    var useHash = true; // Defaults to: false
    var hash = '#!'; // Defaults to: '#'
    this.router = new Navigo(root, useHash, hash);
    this.router.updatePageLinks();
  },
  routes() {

    this.router
    .on({
      '/': () => {
        this.controllers.pages.home();
      },
      'about': () => {
        this.controllers.pages.about();
      },
      'contact': () => {
        this.controllers.pages.contact();
      },
      // lijst van alle reizen - reis toevoegen - reis bewerken - reis verwijderen
      'reizen': () => {
        this.controllers.trips.index();
      },  
      'reizen/maak': () => {
        this.controllers.trips.add();
      },
      'reizen/wijzig/:id': (params) => {
        this.controllers.trips.edit(params);
      },
      'reizen/verwijder/:id': () => {
        this.controllers.trips.delete(params);
      },
    })
    .resolve();
  }
};

app.init();