const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const discoSchema = new Schema (
    {
        title: { type: String, required: true },
        released: { type: Date, required: true },
        label: { type: String },
        producer: { type: String},
        length: { type: Number }
    },
    {
        timestamps: true,
    }
);

const Disco = mongoose.model('discos', discoSchema);

module.exports = Disco;