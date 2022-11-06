const mongoose = require("mongoose");
const Band = require('../../api/bands/bands.model');
const DB_URL = "mongodb+srv://bandsgroup:bandsgroup@cluster0.z7ls8i6.mongodb.net/bandsgroup?retryWrites=true&w=majority";
const bands = [
    {
        name: "Nirvana",
        img: "https://indiehoy.com/wp-content/uploads/2020/09/nirvana-logo.jpg",
        genre: "Rock",
        origin: "Washington, Estados Unidos",
        founded: 1987,
        currentlyActive: false,
        members: "Kurt Cobain, Krist Novoselic, Dave Grohl",
        exMembers: "Chad Channing, Jason Everman, Dale Crover, Dave Foster, Aaron Burckhard, Dan Peters, Pat Smear",
    },
    {
        name: "Red Hot Chili Peppers",
        img: "https://static.posters.cz/image/750/posters/red-hot-chili-peppers-logo-i4622.jpg",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 1983,
        currentlyActive: true,
        members: "Anthony Kiedis, Flea Balzary, Chad Smith, John Frusciante,",
        exMembers: "Hillel Slovak, Jack Irons, Dave Navarro, Josh Klinghoffer, Arik Marshall",
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
