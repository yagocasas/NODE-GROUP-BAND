const mongoose = require('mongoose');
const Band = require('../../api/bands/bands.model');
const { DB_URL } = require('../database/db');

const bands = [
    {
        name: "Nirvana",
        img: "https://www.elnacional.cat/uploads/s1/15/51/89/99/nirvana.jpeg",
        genre: "Rock",
        origin: "Washington, Estados Unidos",
        founded: 1987,
        currentlyActive: false,
        members: "Kurt Cobain, Krist Novoselic, Dave Grohl",
        exMembers: "Chad Channing, Jason Everman, Dale Crover, Dave Foster, Aaron Burckhard, Dan Peters, Pat Smear",
        discography: "Nevermind",
    },
    {
        name: "Red Hot Chili Peppers",
        img: "https://seeklogo.com/images/R/red-hot-chili-peppers-logo-A543BC87F8-seeklogo.com.png",
        genre: "Rock",
        origin: "Los Anegeles, California, Estados Unidos",
        founded: "1983",
        currentlyActive: true,
        members: "Anthony Kiedis, Flea Balzary, Chad Smith, John Frusciante,",
        exMembers: "Hillel Slovak, Jack Irons, Dave Navarro, Josh Klinghoffer, Arik Marshall",
        discography: "Blood Sugar Sex Magik",
    },
    {
        name: "Drake",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Drake_July_2016.jpg",
        genre: "Rap",
        origin: "Toronto, Canada",
        activeYears: "2008 - Actualmente Activo",
        members: "",
        discography: "Nothing Was The Same",
    },
    {
        name: "",
        img: "",
        genre: "",
        origin: "",
        activeYears: "",
        members: "",
        discography: "",
    },
];

mongoose.connect(DB_URL)

.then(async () => {
    const allBands = await Band.find().lean(); // Preguntar otra vez que hace el .lean!

    if(!allBands.length) {
        console.log('No se encuentra ninguna banda, continúo');
    }   else {
        console.log(`Encontradas ${allBands.length} bandas`);
        await Band.collection.drop();
        console.log('Colección eliminada correctamente');
    }
})
.catch((error) => console.log('Error eliminando la colección', error))
.then(async () => {
    await Band.insertMany(bands);
    console.log('Nuevas bandas añadidas con éxito');
})
.catch((error) => console.log('Error añadiendo bandas', error))
.finally(() => mongoose.disconnect());
