const express = require('express');
require('dotenv').config();
const bandsRoutes = require('./src/api/bands/bands.routes');
const discRoutes = require('./src/api/discography/discography.routes');

const db = require('./src/utils/database/db');
db.connectDb();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

server.use(express.json());
server.use('/bands', bandsRoutes);
server.use('/discography', discRoutes);

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
