const dataStore = require("../db/database");

module.exports.crearUsuario = function (usuario) {
    let buscarUsuarioPorNombreYApellido = dataStore.usuarios.filter(
        (r) => r.nombre == usuario.nombre && r.apellido == usuario.apellido
    );
    if (buscarUsuarioPorNombreYApellido.length > 0) {
        throw new Error("Ya existe un usuario con ese nombre y apellido");
    }
    return dataStore.agregarUsuario(usuario);
};

module.exports.listarUsuarios = function () {
    return dataStore.usuarios;
};
