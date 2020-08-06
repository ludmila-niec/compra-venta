const dataStore = require("../db/database");

console.log(dataStore.usuarios);
module.exports.crearUsuario = function (usuario) {
  const { name, lastname, email, password } = usuario;
  // adding validation for empty inputs
  if (name && lastname && email && password) {
    let buscarUsuarioPorNombreYApellido = dataStore.usuarios.filter((r) => {
      /*  old code
        //r.nombre == usuario.nombre && r.apellido == usuario.apellido
        */
      return r.name === usuario.name;
    });

    /*  old code
      //   if (buscarUsuarioPorNombreYApellido.length > 0) {
      //     throw new Error("Ya existe un usuario con ese nombre y apellido");
      //   }
      //   return dataStore.agregarUsuario(usuario);
      */

    if (buscarUsuarioPorNombreYApellido.length > 0) {
      throw new Error("Ya existe un usuario con ese nombre y apellido");
    } else {
      const addedUser = dataStore.agregarUsuario(usuario);
      return addedUser;
    }
  } else {
    throw new Error(" some information are missing");
  }
};

module.exports.listarUsuarios = function () {
  return dataStore.usuarios;
};
