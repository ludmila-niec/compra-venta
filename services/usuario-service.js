const baseDatos = require("../db/database");
const bcrypt = require('bcryptjs')

//en vez de validar si existe por nombre y apellido, voy a buscar solo por email.
module.exports.crearUsuario = function (usuario) {
    let buscarUsuarioPorEmail = baseDatos.usuarios.find(
        (r) => r.email == usuario.email
    );
    if (buscarUsuarioPorEmail) {
        throw new Error("Ya existe un usuario con ese email");
    }
    return baseDatos.agregarUsuario(usuario);
};

module.exports.hashPassword = async function (usuario) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(usuario.password, salt);
    return hashedPassword;
};

module.exports.listarUsuarios = function () {
    return baseDatos.usuarios;
};
