const express = require("express");
const Album = require("./discography.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allAlbums = await Album.find(); // con el .populate no nos funciona, y nos tira el servidor
    return res.status(200).json(allAlbums);
  } catch (error) {
    return res.status(500).json("Error al obtener los albumes", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const albumToFind = await Album.findById(id);
    console.log(albumToFind);
    return res.status(200).json(albumToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const albumByTitle = await Album.findOne({ title: title });
    console.log(albumByTitle);
    return res.status(200).json(albumByTitle);
  } catch (error) {
    return res.status(500).json("Error al encontrar por título");
  }
});

router.post("/create", async (req, res) => {
  try {
    const album = req.body;
    const newAlbum = new Album(album);
    const created = await newAlbum.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear el álbum");
  }
});

router.put("/edit/:id", async (req, res) => {
  // SE HA EDITADO SOLO EL PRIMER VALOR
  try {
    const id = req.params.id;
    const album = req.body;
    const editedAlbum = new Album(album);
    editedAlbum._id = id; // Para que no se modifique la id
    const albumUpdated = await Album.findByIdAndUpdate(id, editedAlbum);
    return res
      .status(201)
      .json({ message: "Se ha editando correctamente la banda", albumUpdated });
  } catch (error) {
    return res.status(500).json("Error al editar la banda");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const albumToDelete = await Album.findByIdAndDelete(id);
    return res.status(200).json("Se ha eliminando correctamente la banda");
  } catch (error) {
    return res.status(500).json("No se ha eliminado correctamente la banda");
  }
});

module.exports = router;
