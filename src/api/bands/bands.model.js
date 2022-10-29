const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = new Schema(
  {
    name: { type: String, required: true },
    founded: { type: Number, required: true },
    genre: {
      type: String,
      enum: [
        "Rock",
        "Pop",
        "Techno",
        "Hip Hop",
        "Rap",
        "Metal",
        "Reggaeton",
        "Folk",
        "Disco",
        "Salsa",
        "Flamenco",
      ],
      required: true,
    },
    origin: { type: String },
    members: { type: mongoose.Types.ObjectId, ref: "members" },
    discography: { type: mongoose.Types.ObjectId, ref: "discography" },
    image: {
      type: String,
      default:
        "https://p1.pxfuel.com/preview/870/604/61/concert-singer-women-music-singing.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Band = mongoose.model('bands', bandSchema);

module.exports = Band;