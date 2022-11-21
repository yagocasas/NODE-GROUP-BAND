const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error('No se ha podido conectar a la db');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const { name, host } = db.connection;
        console.log(`Conectado a la db: ${name} en ${host}`);            
    } catch (error) {
        console.log('Error al conectar a la base de datos: ', error);
    }
};

module.exports = {
    DB_URL,
    connectDb,
};

