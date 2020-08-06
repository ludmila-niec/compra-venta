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
    // adding the product to the user who created it

    // something wrong here , always the usuarios array is emtpy when adding new products!!
    for (let user of this.usuarios) {
      if (user.id === idUser) {
        user.push(producto);
        this.productos.push(producto);
        idProducto++;
        return true;
      }
    }
  },
};
