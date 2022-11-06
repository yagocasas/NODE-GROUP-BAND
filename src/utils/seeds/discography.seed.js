const mongoose = require('mongoose');
const Album = require('../../api/discography/discography.model');
const { DB_URL } = require('../database/db');

const albumes = [
    {
        title: "The Red Hot Chili Peppers",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Rhcp1.jpg/220px-Rhcp1.jpg",
        released: "1984-10-07T23:00:00.000Z",
        label: "EMI/Capitol Records",
        producer: "Andy Gill",
        length: "32:32",
    },
    {
        title: "Freaky Style",
        img: "https://i.discogs.com/9Maog2C41Fl3btzoIVbJcMW__ZiAZdqDSn4ml4KN7jQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5MTc2/MzctMTM1MTc3ODc3/NC01Njk1LmpwZWc.jpeg",
        released: "1985-08-16T00:00:00.000Z",
        label: "EMI",
        producer: "George Clinton",
        length: "39:50",
    },
    {
        title: "Nevermind",
        img: "https://m.media-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg",
        released: "1991-09-24T00:00:00.000Z",
        label: "DGC Records",
        producer: "Butch Vig",
        length: "42:38",
    },
    {
        title: "In Utero",
        img: "https://m.media-amazon.com/images/I/71eLqPemDvS._SL1500_.jpg",
        released: "1993-09-21T00:00:00.000Z",
        label: "DGC Records",
        producer: "Steve Albini y Scott Litt",
        length: "41:12",
    },
];

mongoose.connect(DB_URL)

.then(async () => {
    const allAlbums = await Album.find().lean(); // Preguntar otra vez que hace el .lean!

    if(!allAlbums.length) {
        console.log('No se encuentra ningún disco, continúo');
    }   else {
        console.log(`Encontrado/s ${allAlbums.length} disco/s`);
        await Album.collection.drop();
        console.log('Colección eliminada correctamente');
    }
})
.catch((error) => console.log('Error eliminando la colección', error))
.then(async () => {
    await Album.insertMany(bands);
    console.log('Nuevos discos añadidas con éxito');
})
.catch((error) => console.log('Error añadiendo discos', error))
.finally(() => mongoose.disconnect());
