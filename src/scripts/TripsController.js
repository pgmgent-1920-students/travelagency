import nunjucks from 'nunjucks';
import db from './database';

class TripsController {
    constructor(template_wrapper, router) {
        this.wrapper = template_wrapper;
        this.router = router;
    }

    async index() {

        const trips = await this._getTrips();

        const template = nunjucks.render('trips/index.html', {
            'title': 'Alle reizen',
            trips: trips
        });
        this.wrapper.innerHTML = template;
        this.router.updatePageLinks();

    }   

    add() {
        const template = nunjucks.render('trips/add.html', {
            'title': 'Voeg een reis toe',
            'description': 'Follow your dreams'
        });
        this.wrapper.innerHTML = template;

        let newTripForm = document.getElementById('add-trip');
        newTripForm.addEventListener('submit', async (e) => {
            // don't submit the form (just yet)
            e.preventDefault();

            let formData = new FormData(newTripForm);
            const id = await this._createTrip(formData);
            if(id) {
                this.router.navigate('/reizen');
            }
        });
    }

    async edit(params) {

        const id = parseInt(params.id);
        const trip = await this._getTrip(id);
        
        const template = nunjucks.render('trips/edit.html', {
            'title': 'Wijzig reis',
            trip: trip
        });
        this.wrapper.innerHTML = template;

        let editTripForm = document.getElementById('edit-trip');
        editTripForm.addEventListener('submit', async (e) => {
            // don't submit the form (just yet)
            e.preventDefault();

            let formData = new FormData(editTripForm);
            const updateId = this._updateTrip(id, formData);
            
            if(updateId) {
                this.router.navigate('/reizen');
            }
        });

    }

    async delete(params) {
        const id = parseInt(params.id);
        const deleted = this._deleteTrip(id);
        if(deleted) this.router.navigate('/reizen');
    }
    


    async _createTrip(data) {
        const trip = await db.trips.add({
            title: data.get('title'),
            location: data.get('location')
        });
        return trip;
    }

    async _updateTrip(id, data) {

        const trip = await db.trips.update(id, {
            title: data.get('title'),
            location: data.get('location')
        });
        
        return trip;
    }

    async _deleteTrip(id) {
        const deleted = await db.trips.where('id').equals(id).delete();       
        return deleted;
    }

    async _getTrips() {
        const trips = await db.trips.toArray();
        return trips;
    }

    async _getTrip(id) {
        const trip = await db.trips.get(id);
        return trip;
    }



}

export default TripsController;