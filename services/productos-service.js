const dataStore = require("../DB/database");

//crear producto
module.exports.crearProducto = function (producto, idUser) {
    let nuevoproducto = dataStore.agregarProducto(producto, idUser);
    if (!nuevoproducto) {
        throw new Error("Error, no se pudo crear el producto");
    } else {
        return producto;
    }
};
