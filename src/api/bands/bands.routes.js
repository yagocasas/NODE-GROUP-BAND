const express = require('express');
const Band = require('./bands.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allBands = await Band.find();
        return res.status(200).json(allBands);
    } catch (error) {
        return res.status(500).json(error);
    }
})




module.exports = router;