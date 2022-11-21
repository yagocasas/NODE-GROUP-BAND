const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = new Schema(
  {
    name: { type: String, required: true },
    img: {
        type: String,
        default:
          "https://p1.pxfuel.com/preview/870/604/61/concert-singer-women-music-singing.jpg", required: true
      },
    genre: {
      type: String,
      enum: [
        "Rock",
        "Pop",
        "Rap",
        "Metal",
        "Folk",
        "Grunge",
        "Funky",
        "Soul", 
        "Blues", 
       
      ],
      required: true,
    },
    origin: { type: String },
    founded: { type: Number},
    currentlyActive: { type: Boolean },
    members: { type: String},
    // members: { type: mongoose.Types.ObjectId, ref: "members" },
    exMembers: { type: String },
    // discography: { type: String},
    discography: [{ type: mongoose.Types.ObjectId, ref: "albums" }],
  },
  {
    timestamps: true,
  }
);

const Band = mongoose.model('bands', bandSchema);

module.exports = Band;