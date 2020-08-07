const baseDatos = require("../db/database");

//crear producto
module.exports.crearProducto = function (producto, idUser) {
    let nuevoproducto = baseDatos.agregarProducto(producto, idUser);
    if (!nuevoproducto) {
        throw new Error("Error, no se pudo crear el producto");
    } else {
        return producto;
    }
};

module.exports.listarProductos = function () {
    return baseDatos.productos;
};