import nunjucks from 'nunjucks';

class PagesController {
    constructor(template_wrapper) {
        this.wrapper = template_wrapper;
    }
    home() {
        let template = nunjucks.render('pages/home.html', {
            title: 'Time to sweep our shovel'
        });
        this.wrapper.innerHTML = template;
    }
    about() {

    }
    contact() {

    }
}

export default PagesController;