let idUsuario = 1;
let idProducto = 1;

let usuarios = [];
let productos = [];

function agregarUsuario(usuario) {
  //agrego array de productos creados por el usuario
  usuario.misProductos = [];
  //agrego lista de compras
  usuario.misCompras = [];
  usuario.id = idUsuario;
  usuarios.push(usuario);
  idUsuario++;
  return usuario;
}

function agregarProducto(producto, idUser) {
  producto.id = idProducto;
  producto.idUsuario = idUser;
  //Ahora se agrega el producto al usuario correspondiente en su lista de 'misProductos'
  let buscarUsuarioporId = usuarios.find((user) => user.id == idUser);
  if (!buscarUsuarioporId) {
    throw new Error("No se encontró el id del vendedor");
  }
  console.log(buscarUsuarioporId);
  buscarUsuarioporId.misProductos.push(producto);
  productos.push(producto);
  idProducto++;
  return producto;
}

function realizarUnaCompra(idProducto, idUser) {
  try {
    // check si el producto existe
    const producto = productos.find((p) => p.id == idProducto);
    if (!producto) throw new Error(" no existe este producto ");

    //agregue el producto al comprador
    usuarios.forEach((usuario) => {
      if (usuario.id == idUser) {
        usuario.misCompras.push(producto);
      }
    });

    // eliminar el producto de los productos del vendedor
    for (let usuario of usuarios) {
      if (usuario.id == producto.idUsuario) {
        usuario.misProductos = usuario.misProductos.filter(
          (p) => p.id != producto.id
        );
      }
    }

    // eliminar el producto de los productos
    productos = productos.filter((p) => p.id != idProducto);

    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  usuarios: usuarios,
  productos: productos,
  agregarUsuario: agregarUsuario,
  agregarProducto: agregarProducto,
  realizarUnaCompra: realizarUnaCompra,
};
