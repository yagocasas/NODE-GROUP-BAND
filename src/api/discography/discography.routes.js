const express = require("express");
const Disc = require("./discography.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allDiscs = await Disc.find();
    return res.status(200).json(allDiscs);
  } catch (error) {
    return res.status(500).json("Error al obtener los discos", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const discToFind = await Disc.findById(id);
    console.log(discToFind);
    return res.status(200).json(discToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const discByTitle = await Disc.findOne({ title: title });
    console.log(discByTitle);
    return res.status(200).json(discByTitle);
  } catch (error) {
    return res.status(500).json("Error al encontrar por título");
  }
});

router.post("/create", async (req, res) => {
  try {
    const disc = req.body;
    const newDisc = new Disc(disc);
    const created = await newDisc.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear el disco");
  }
});

router.put("/edit/:id", async (req, res) => {
  // SE EDITADO SOLO EL PRIMER VALOR
  try {
    const id = req.params.id;
    const disc = req.body;
    const editedDisc = new Disc(disc);
    editedDisc._id = id; // Para que no se modifique la id
    const discUpdated = await Disc.findByIdAndUpdate(id, editedDisc);
    return res
      .status(201)
      .json({ message: "Se ha editando correctamente la banda", discUpdated });
  } catch (error) {
    return res.status(500).json("Error al editar la banda");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const discToDelete = await Disc.findByIdAndDelete(id);
    return res.status(200).json("Se ha eliminando correctamente la banda");
  } catch (error) {
    return res.status(500).json("No se ha eliminado correctamente la banda");
  }
});

module.exports = router;
