const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://bandsgroup:bandsgroup@cluster0.z7ls8i6.mongodb.net/bandsgroup?retryWrites=true&w=majority";

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
    DB_URL, // Cuando metamos en el .env, lo borramos.
    connectDb,
};

