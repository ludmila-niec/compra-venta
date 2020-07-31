
let idUsuario = 1;
let idProducto = 1;
module.exports = {
    usuarios: [],
    agregarUsuario(usuario) {
        usuario.id = idUsuario;
        this.usuarios.push(usuario);
        idUsuario++;
        return usuario;
    },
    productos: [],
    agregarProducto(producto, idUser) {
        producto.id = idProducto;
        producto.idUsuario = idUser;
        this.productos.push(producto);
        idProducto++;
        return true;
    },
};
