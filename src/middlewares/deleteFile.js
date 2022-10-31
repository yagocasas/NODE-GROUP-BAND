const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) => {

    const img$Splited = imgUrl.split('/');

    //console.log(img$Splited); me devuelve el array

    const nameSplited = img$Splited[img$Splited.length - 1].split('.')[0]; //Cojo solo el nombre de usuario
    //console.log(nameSplited);

    const folderSplited = img$Splited[img$Splited.length - 2];
    //console.log(folderSplited);

    const public_id = `${folderSplited}/${nameSplited}`;
    //console.log(public_id)

    cloudinary.uploader.destroy(public_id, () => {  // --> función de cloudinary destroy pasando el public_id y elimina el archivo

        console.log('Se ha eliminado el archivo');
    })

};

module.exports = { deleteFile }