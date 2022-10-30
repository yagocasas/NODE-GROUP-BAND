const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema (
    {
        title: { type: String, required: true },
        img: { type: String },
        released: { type: Date },
        label: { type: String },
        producer: { type: String},
        length: { type: Number }
    },
    {
        timestamps: true,
    }
);

const Album = mongoose.model('albums', albumSchema);

module.exports = Album;