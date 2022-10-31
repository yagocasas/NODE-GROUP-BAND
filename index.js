const express = require('express');
const bandsRoutes = require('./src/api/bands/bands.routes');
const albumRoutes = require('./src/api/discography/discography.routes');
const usersRoutes = require('./src/api/users/users.routes');
const cors = require('cors');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const db = require('./src/utils/database/db');
db.connectDb();

cloudinary.config( {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();

server.use(cors({
    origin: '*',
    credentials: true
}))

const router = express.Router();

server.use(express.json());
server.use('/users', usersRoutes)
server.use('/bands', bandsRoutes);
server.use('/discography', albumRoutes);

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
