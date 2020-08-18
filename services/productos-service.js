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

module.exports.validarCamposProductoNuevo = function(producto,usuarioId){
    const { nombreProducto, precio, estado, descripcion } = producto;
     let errores = [];
     //checkear campos vacios
     if (!nombreProducto || !precio || !estado || !descripcion) {
         errores.push({
             mensaje: "Faltan completar campos",
         });
     }
     if(nombreProducto.length < 6){
        errores.push({mensaje:"El nombre del producto debe tener al menos 6 caracteres"})
     }
     if(descripcion.length < 10){
        errores.push({mensaje:"La descripcion del producto debe tener al menos 10 caracteres"})
     }

     //checkear que el nombre del producto no se encuentre registrado en su lista de productos
    //  let productoRepetido = baseDatos.usuarios.find(item => item.id == usuarioId && item.misProductos == nombreProducto )
    //  if(productoRepetido){
    //      errores.push({mensaje:"Ya existe un producto con ese nombre"})
    //  }

     return errores
}

module.exports.buscarProductoPorPalabraClave = function (busqueda) {
    //buscar palabra clave en la descripcion del producto o nombre del produco
    let lista = baseDatos.productos.filter(
        (item) =>
            item.descripcion.includes(busqueda) ||
            item.nombreProducto.includes(busqueda)
    );
    if (lista.length > 0) {
        return lista;
    } else {
        return null;
    }
};
module.exports.filtrarPorEstado = function (lista, estado) {
    if (estado === "nuevo") {
        let listaNuevos = lista.filter((item) => item.estado == "nuevo");
        if (listaNuevos.length > 0) {
            return listaNuevos;
        } else {
            return null;
        }
    }

    if (estado === "usado") {
        let listaUsados = lista.filter((item) => item.estado == "usado");
        if (listaUsados.length > 0) {
            return listaUsados;
        } else {
            return null;
        }
    }
};

module.exports.listarProductos = function () {
    return baseDatos.productos;
};
