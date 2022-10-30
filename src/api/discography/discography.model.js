const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const discoSchema = new Schema (
    {
        title: { type: String, required: true },
        released: { type: Date },
        label: { type: String },
        producer: { type: String},
        length: { type: Number }
    },
    {
        timestamps: true,
    }
);

const Disc = mongoose.model('discs', discoSchema);

module.exports = Disc;