import nunjucks from 'nunjucks';
import db from './database';

class TripsController {
    constructor(template_wrapper, router) {
        this.wrapper = template_wrapper;
        this.router = router;
    }

    index() {
        const template = nunjucks.render('trips/index.html', {
            'title': 'Alle reizen',
            trips: [
                {
                    title: 'Zeetje',
                    location: 'Zeeland'
                },
                {
                    title: 'Boswandeling',
                    location: 'Heidebos'
                }
            ]
        });
        this.wrapper.innerHTML = template;
    }   

    add() {
        const template = nunjucks.render('trips/add.html', {
            'title': 'Voeg een reis toe',
            'description': 'Follow your dreams'
        });
        this.wrapper.innerHTML = template;

        let newTripForm = document.getElementById('add-trip');
        newTripForm.addEventListener('submit', (e) => {
            // don't submit the form (just yet)
            e.preventDefault();

            let formData = new FormData(newTripForm);
            this._createTrip(formData).then(id => {
                this.router.navigate('/reizen');
            })

        });
    }

    async _createTrip(data) {
        const trip = await db.trips.add({
            title: data.get('title'),
            location: data.get('location')
        });
        return trip;
    }

    edit(id) {
        document.write('wijzig reis' + id);
    }

    delete(id) {
        document.write('verwijder reis' + id);
    }
    
}

export default TripsController;