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
    {
        name: "Drake",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Drake_July_2016.jpg",
        genre: "Rap",
        origin: "Toronto, Canada",
        founded: 2008,
        currentlyActive: true,
        members: "",
    },
    {
        name: "Michael Jackson",
        img: "https://www.treceveinte.net/wp-content/uploads/2017/06/michael-jackson-600x800.jpg",
        genre: "Pop",
        origin: "Indiana, Estados Unidos",
        founded: 1964,
        currentlyActive: false,
        members: "Michael Jackson",
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
