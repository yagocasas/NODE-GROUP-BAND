const express = require('express');
require('dotenv').config();

const PORT = 3000;
const server = express();

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
