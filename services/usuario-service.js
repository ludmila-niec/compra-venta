const baseDatos = require("../db/database");
const bcrypt = require("bcryptjs");

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

//metodo para validar campos del registro de nuevo usuario
module.exports.validarCamposNuevoUsuario = function (data) {
    const { nombre, apellido, email, password } = data;
    let errores = [];
    if (!nombre || !apellido || !email || !password) {
        errores.push({ mensaje: "Faltan completar campos" });
    }

    //validar un email real
    if (!email.includes(".com")) {
        errores.push({ mensaje: "No ingresastre un email válido" });
    }

    //validar password
    if (password.length < 6) {
        errores.push({
            mensaje: "La contraseña debe tener al menos 6 caracteres",
        });
    }

    return errores;
};
//metodo para validar campos campos de inicio de sesion
module.exports.validarCamposInicioSesion = async function (data) {
    const { email, password } = data;
    let errores = [];

    //checkear campos vacios
    if (!email || !password) {
        errores.push({ mensaje: "Faltan completar campos" });
    }
    //buscar si el email esta registrado en la base de datos
    let usuarioPorEmail = baseDatos.usuarios.find((r) => r.email == email);
    if (!usuarioPorEmail) {
        errores.push({ mensaje: "El email ingresado no es valido" });
        return errores;
    }
    //checkear contraseña valida
    const passwordValido = await bcrypt.compare(
        password,
        usuarioPorEmail.password
    );
    if (!passwordValido) {
        errores.push({ mensaje: "La contraseña ingresada es incorrecta" });
    }

    return errores;
};

module.exports.hashPassword = async function (usuario) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(usuario.password, salt);
    return hashedPassword;
};

module.exports.listarUsuarios = function () {
    return baseDatos.usuarios;
};
