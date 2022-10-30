const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const discSchema = new Schema (
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

const Disc = mongoose.model('discs', discSchema);

module.exports = Disc;