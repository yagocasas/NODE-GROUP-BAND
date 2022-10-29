const express = require('express');
const bandsRoutes = require('./src/api/bands/bands.routes');
require('dotenv').config();

const db = require('./src/utils/database/db');
db.connectDb();

const PORT = 3000;
const server = express();


server.use(express.json());
server.use('/bands', bandsRoutes);

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
