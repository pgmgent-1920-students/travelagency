import Dexie from 'dexie';

const db = new Dexie('neckermann');
db.version(1).stores({
    trips: `++id,title,location`
});

export default db;