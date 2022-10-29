const express = require('express');
const bandsRoutes = require('./src/api/bands/bands.routes');
require('dotenv').config();

const db = require('./src/utils/database/db');
db.connectDb();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

server.use(express.json());
server.use('/bands', bandsRoutes);

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
