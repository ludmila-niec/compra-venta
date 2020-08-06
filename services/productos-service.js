const dataStore = require("../DB/database");

//crear producto
module.exports.crearProducto = function (producto, idUser) {
  // adding validation
  const { name } = producto;
  const filteredData = dataStore.productos.filter((p) => p.name === name);
  if (filteredData.length > 0) {
    throw new Error("this product already exist!");
  } else {
    let nuevoproducto = dataStore.agregarProducto(producto, idUser);
    if (!nuevoproducto) {
      throw new Error("Error, no se pudo crear el producto");
    } else {
      return producto;
    }
  }
};
