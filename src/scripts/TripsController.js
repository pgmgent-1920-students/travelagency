import nunjucks from 'nunjucks';

class TripsController {
    constructor(template_wrapper) {
        this.wrapper = template_wrapper;
    }
    home() {
        let template = nunjucks.render('pages/home.html');
        this.wrapper.innerHTML = template;
    }
    about() {
        
    }
    contact() {

    }
}

export default TripsController;