let idUsuario = 1;
let idProducto = 1;

let usuarios = [];
let productos = [];

function agregarUsuario(usuario) {
    //agrego array de productos creados por el usuario
    usuario.misProductos = []
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
        throw new Error ('No se encontró el id del vendedor')
    }
    console.log(buscarUsuarioporId)
    buscarUsuarioporId.misProductos.push(producto);
    productos.push(producto);
    idProducto++;
    return producto;
}

module.exports = {
    usuarios: usuarios,
    productos: productos,
    agregarUsuario: agregarUsuario,
    agregarProducto: agregarProducto,
};
