const mongoose = require("mongoose");
const Band = require('../../api/bands/bands.model');
const DB_URL = process.env.DB_URL;
const { connectDb } = require('../database/db')
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
        members: "Anthony Kiedis, Flea Balzary, Chad Smith, John Frusciante",
        exMembers: "Hillel Slovak, Jack Irons, Dave Navarro, Josh Klinghoffer, Arik Marshall",
    },
    {
        name: "The Raconteurs",
        img: "https://pogopedia.com.ar/img/bandas/7f5ahuffZtCaP6dLmCZiQir7ihaUD3kFE07.jpg",
        genre: "Rock",
        origin: "Detroit, Estados Unidos",
        founded: 2005,
        currentlyActive: true,
        members: "Jack White, Brendan Benson, Jack Lawrence, Patrick Keeler, Dean Fertita (solamente en directos)",
        exMembers: "",
    },
    {
        name: "Pearl Jam",
        img: "http://ww1.prweb.com/prfiles/2014/05/29/11898255/pearl-jam-tickets-moline-illinois-iwireless-center.jpg",
        genre: "Grunge",
        origin: "Seattle, Estados Unidos",
        founded: 1990,
        currentlyActive: true,
        members: "Eddie Vedder, Mike McCready, Josh Klinghoffer, Stone Gossard, Jeff Ament, Matt Cameron",
        exMembers: "Jack Irons, Dave Krusen, Matt Chamberlain, Dave Abbruzzese",
    },
    {
        name: "The Black Crowes",
        img: "https://elcadillacnegro.files.wordpress.com/2013/10/the-black-crowes-logo.jpg?w=280",
        genre: "Rock",
        origin: "Georgia, Estados Unidos",
        founded: 1984,
        currentlyActive: true,
        members: "Chris Robinson, Rich Robinson, Sven Pipien, Isaiah Mitchell, Joel Robinow, Brian Griffin, Charlie Starr, Erik Deutsch",
        exMembers: "Steve Gorman, Johnny Colt, Marc Ford, Luther Dickinson, otros",
    },
    {
        name: "Audioslave",
        img: "https://i.pinimg.com/originals/21/f7/65/21f7655584619ac55c7c3a96ad266b22.jpg",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 2001,
        currentlyActive: false,
        members: "Chris Cornell, Tom Morello, Tim Commerford, Brad Wilk",
        exMembers: "",
    },
    {
        name: "Incubus",
        img: "https://static.wikia.nocookie.net/logopedia/images/b/b6/Incubus1997.svg/revision/latest?cb=20200710232432",
        genre: "Rock",
        origin: "California, Estados Unidos",
        founded: 1991,
        currentlyActive: true,
        members: "Brandom Boyd, Mike Einziger, José Pasillas, Ben Kenney, DJ Kilmore",
        exMembers: "Alex 'Dirk Lance' Katunich, Gavin 'DJ Lyfe' Koppell",
    },
    {
        name: "Moon Cresta",
        img: "https://f4.bcbits.com/img/0016018464_10.jpg",
        genre: "Rock",
        origin: "Vigo, Galicia",
        founded: 1983,
        currentlyActive: true,
        members: "David 'Mr D' Vázquez, Manu 'Doble L', Antón F. 'Piru', Manu Ares",
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
