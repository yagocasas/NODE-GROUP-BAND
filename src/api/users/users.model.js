const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user"},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true }},
    photo: { type: String}
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSyns(this.password, 10);
    next();
})

const User = mongoose.model("users", userSchema);
module.exports = User;



// userSchema.pre("save", function(next){
//     const user = this;

//     if(!user.isModified("password"))
//     return next();

//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, function(err, hash){
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         })
//     })

//     userSchema.methods.comparePasswords = function(candidatePassword, cb) {
//         bcrypt.comapre(candidatePassword, this.password, function(err, isMatch){
//             if (err) return cb(err);
//             cb(null, isMatch);
//         });
//     });

//     module.exports = mongoose.model("user", userSchema);
