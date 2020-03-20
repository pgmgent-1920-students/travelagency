import nunjucks from 'nunjucks';

class PagesController {
    constructor(template_wrapper) {
        this.wrapper = template_wrapper;
    }
    home() {
        let template = nunjucks.render('pages/home.html', {
            title: 'Neckermann'
        });
        this.wrapper.innerHTML = template;
    }
    about() {
        let template = nunjucks.render('pages/about.html', {
            title: 'Over Neckermann',
            description: 'lorem ipsum',
            team: [
                'Saskia',
                'Maggie',
                'Richard'
            ]
        });
        this.wrapper.innerHTML = template;
    }
    contact() {
        let template = nunjucks.render('pages/contact.html', {
            title: 'Contacteer ons'
        });
        this.wrapper.innerHTML = template;
    }
}

export default PagesController;