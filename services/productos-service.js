const baseDatos = require("../db/database");
const database = require("../db/database");

//crear producto
module.exports.crearProducto = function (producto, idUser) {
    let nuevoproducto = baseDatos.agregarProducto(producto, idUser);
    if (!nuevoproducto) {
        throw new Error("Error, no se pudo crear el producto");
    } else {
        return producto;
    }
};

module.exports.buscarProductoPorNombre = function (busqueda) {
    let lista = baseDatos.productos.filter(
        (item) => item.nombreProducto == busqueda
    );
    if (lista.length > 0) {
        return lista;
    } else {
        return null;
    }
};

//retorna todos los productos nuevos
module.exports.buscarProductoNuevo = function () {
    let listaNuevos = baseDatos.productos.filter(
        (item) => item.estado == "nuevo"
    );
    if (listaNuevos.length > 0) {
        return listaNuevos;
    } else {
        return null;
    }
};
//retorna todos los productos usados
module.exports.buscarProductoUsado = function () {
    let listaUsados = baseDatos.productos.filter(
        (item) => item.estado == "usado"
    );
    if (listaUsados.length > 0) {
        return listaUsados;
    } else {
        return null;
    }
};

module.exports.listarProductos = function () {
    return baseDatos.productos;
};
