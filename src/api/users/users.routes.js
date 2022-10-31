const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json("Error al leer el usuario");
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    if (newUser.rol === "user") {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res.status(500).json('no te puedes registrar como admin')
    }
  } catch (error) {
    return res.status(500).json("Error al crear el usuario");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.body.email});
    if (!userDB) {
        return res.status(404).json('No existe el usuario indicado');
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
        const token = generateSign(userDb._id, userDB.email);
        return res.status(200).json({ token, userDB });
    } else {
        return res.status(500).json("La contraseña indicada es incorrecta");        
    }
  } catch (error) {
    return res.status(500).json("Error al ingresar el usuario", error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json("Error al cerrar sesión", error);
  }
});

module.exports = router;
