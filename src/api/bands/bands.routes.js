const express = require("express");
const Band = require("./bands.model");


const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require("../../middlewares/file");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allBands = await Band.find().populate('discography');
    return res.status(200).json(allBands);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const bandToFind = await Band.findById(id);
    console.log(bandToFind);
    return res.status(200).json(bandToFind);
  } catch (error) {
    return res.status(500).json('Error al encontrar por Id');
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const bandByName = await Band.findOne({ name: name });
    console.log(bandByName);
    return res.status(200).json(bandByName);
  } catch (error) {
    return res.status(500).json("Error al encontrar por nombre");
  }
});

router.post("/create", upload.single("img"), async (req, res) => {
  try {
    const band = req.body;
    if (req.file){
      band.img = req.file.path
    }
    const newBand = new Band(band);
    const created = await newBand.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear la banda");
  }
});

router.post('/add-album/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const {album} = req.body;

      const bandUpdated = await Band.findByIdAndUpdate(id, { $push: { discography: album } }, {new: true, lean: true});

      console.log(bandUpdated);

      return res.status(201).json({ message: 'Album added sucessfully', bandUpdated });
  } catch (error) {
      return next(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  // SE EDITADO SOLO EL PRIMER VALOR
  try {
    const id = req.params.id;
    const band = req.body;
    const editedBand = new Band(band);
    editedBand._id = id; // Para que no se modifique la id
    const bandUpdated = await Band.findByIdAndUpdate(id, editedBand);
    return res
      .status(201)
      .json({ message: "Se ha editando correctamente la banda", bandUpdated });
  } catch (error) {
    return res.status(500).json("Error al editar la banda");
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const bandToDelete = await Band.findByIdAndDelete(id);
    return res.status(200).json("Se ha eliminando correctamente la banda");
  } catch (error) {
    return res.status(500).json("No se ha eliminado correctamente la banda");
  }
});

module.exports = router;
