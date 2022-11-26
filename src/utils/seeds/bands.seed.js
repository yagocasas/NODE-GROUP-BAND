const mongoose = require("mongoose");
const Band = require('../../api/bands/bands.model');
const DB_URL = process.env.DB_URL;
const { connectDb } = require('../database/db')
const bands = [
    {
        name: "Nirvana",
        img: "https://1000logos.net/wp-content/uploads/2017/03/Nirvana-Logo.png",
        genre: "Rock",
        origin: "Washington, Estados Unidos",
        founded: 1987,
        currentlyActive: false,
        members: "Kurt Cobain (voz y guitarra), Krist Novoselic (bajo y voz), Dave Grohl (batería y voz)",
        exMembers: "Chad Channing, Jason Everman, Dale Crover, Dave Foster, Aaron Burckhard, Dan Peters, Pat Smear",
    },
    {
        name: "Red Hot Chili Peppers",
        img: "https://seeklogo.com/images/R/red-hot-chili-peppers-logo-A543BC87F8-seeklogo.com.png",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 1983,
        currentlyActive: true,
        members: "Anthony Kiedis (voz), Flea Balzary (bajo, trompeta, piano y voz), Chad Smith (batería), John Frusciante (guitarra y voz",
        exMembers: "Hillel Slovak, Jack Irons, Dave Navarro, Josh Klinghoffer, Arik Marshall",
    },
    {
        name: "The Raconteurs",
        img: "https://pogopedia.com.ar/img/bandas/7f5ahuffZtCaP6dLmCZiQir7ihaUD3kFE07.jpg",
        genre: "Rock",
        origin: "Detroit, Estados Unidos",
        founded: 2005,
        currentlyActive: true,
        members: "Jack White (voz, giutarra y piano), Brendan Benson (voz y guitarra), Jack Lawrence (bajo y voz), Patrick Keeler (batería), Dean Fertita (solamente en directos, teclados)",
        exMembers: "",
    },
    {
        name: "Pearl Jam",
        img: "https://i.pinimg.com/originals/b3/53/f7/b353f794ad26c095b949dd1deb40e1a9.png",
        genre: "Grunge",
        origin: "Seattle, Estados Unidos",
        founded: 1990,
        currentlyActive: true,
        members: "Eddie Vedder (voz y guitarra), Mike McCready (guitarra y voz), Josh Klinghoffer (guitarra, teclados, sintetizadores y voz), Stone Gossard (guitarras y voz), Jeff Ament (bajo y voz), Matt Cameron (batería y voz",
        exMembers: "Jack Irons, Dave Krusen, Matt Chamberlain, Dave Abbruzzese",
    },
    {
        name: "The Black Crowes",
        img: "https://images.fineartamerica.com/images/artworkimages/medium/3/3-best-selling-logo-music-the-black-crowes-fenomenal-disco-punkhead-transparent.png",
        genre: "Rock",
        origin: "Georgia, Estados Unidos",
        founded: 1984,
        currentlyActive: true,
        members: "Chris Robinson (voz, armónica, guitarra acústica), Rich Robinson (guitarra y voz), Sven Pipien (bajo), Isaiah Mitchell (guitarra y voz), Joel Robinow (teclados y voz), Brian Griffin (batería), Charlie Starr (guitarrista), Erik Deutsch (teclados)",
        exMembers: "Steve Gorman, Johnny Colt, Marc Ford, Luther Dickinson, otros",
    },
    {
        name: "Audioslave",
        img: "https://chriscornell.com/wp-content/themes/Chris%20Cornell%202018/img/audioslave.png",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 2001,
        currentlyActive: false,
        members: "Chris Cornell (voz y guitarra rítmica), Tom Morello (guitarra), Tim Commerford (bajo), Brad Wilk (batería)",
        exMembers: "Esta banda nació, creció y se convirtió en leyenda con sus miembros originales",
    },
    {
        name: "Incubus",
        img: "https://cdn.freebiesupply.com/logos/thumbs/2x/incubus-logo.png",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 1991,
        currentlyActive: true,
        members: "Brandom Boyd (voz, percusión), Mike Einziger (guitarra, teclados y voz), José Pasillas (batería), Ben Kenney (bajo y voz), DJ Kilmore (teclados, tocadiscos, theremin, sintetizadores) ",
        exMembers: "Alex 'Dirk Lance' Katunich, Gavin 'DJ Lyfe' Koppell",
    },
    {
        name: "Moon Cresta",
        img: "https://www.redescena.net/imagenes/contenido/logos-cias/logoai.png",
        genre: "Rock",
        origin: "Vigo, Galicia",
        founded: 1983,
        currentlyActive: true,
        members: "David 'Mr D' Vázquez (voz y teclados), Manu 'Doble L' (guitarra y voz), Antón F (bajo y voz). 'Piru', Manu Ares (batería y voz)",
        exMembers: "Kike 'Calzzonetti', Rubén 'Groove Ruby'",
    },
];


connectDb()
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
