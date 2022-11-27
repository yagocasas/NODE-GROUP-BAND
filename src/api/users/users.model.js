const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    rol: { type: String, enum: ["admin", "user"], default: "user"},
    name: { type: String, trim: true },//requerido?? 
    lastname: { type: String, trim: true },//requerido??
    username: { type: String, index: { unique: true } , trim: true}, //requerido? cuándo
    photo: { type: String}
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model("users", userSchema);
module.exports = User;
