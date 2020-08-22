// const baseDatos = require("../db/database");
const bcrypt = require("bcryptjs");
const repoUsuarios = require('../repositorio/usuarios.repositorio');
const sql = require('../connection');

//metodo para validar campos del registro de nuevo usuario
module.exports.validarCamposNuevoUsuario = async function (data) {
    const { nombre, apellido, email, password } = data;
    let errores = [];
    //check si hay campos vacios
    if (!nombre || !apellido || !email || !password) {
        errores.push({
            mensaje: "Faltan completar campos",
        });
    }
    //check nombre solo letras
    if (!/^[a-z]+$/i.test(nombre)) {
        errores.push({ mensaje: "Nombre solo acepta letras" });
    }
    //check apellido solo letras
    if (!/^[a-z]+$/i.test(apellido)) {
        errores.push({ mensaje: "Apellido solo acepta letras" });
    }
    //validar un email real
    if (!email.includes(".com")) {
        errores.push({
            mensaje: "No ingresastre un email válido",
        });
    }
    //checkear si el email ingresado ya se encuentra registrado
    let [buscarUsuarioPorEmail] = await sql.query("SELECT * FROM usuarios WHERE email = :emailusuario", { replacements: { emailusuario: email } })

    if (buscarUsuarioPorEmail.length > 0) {
        errores.push({
            mensaje: "Ya existe un usuario con ese email",
        });
        //si el email esta registrado informar el error. No va a verificar el password valido
        return errores;
    }
    //validar password minimo 6 caracteres
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
    console.log({ email, password });
    let errores = [];

    //checkear campos vacios
    if (!email || !password) {
        errores.push({ mensaje: "Faltan completar campos" });
    }
    //buscar si el email esta registrado en la base de datos
    let usuarioPorEmail = await repoUsuarios.buscarUsuarioPorE(email);
    
    if (usuarioPorEmail.length != 1) {
        errores.push({ mensaje: "El email ingresado no es valido" });
        return errores;
    }
 
    let usuarioPassword = usuarioPorEmail[0].password;
    //checkear contraseña valida 
    const passwordValido = await bcrypt.compare(password, usuarioPassword);
    console.log(passwordValido);

    if (!passwordValido) {
        errores.push({ mensaje: "La contraseña ingresada es incorrecta" });
    }

    return errores;
};

//buscar usuario por email
module.exports.buscarUsuarioPorEmail = async function (email) {
    let buscarUsuarioPorEmail = await repoUsuarios.buscarUsuarioPorE(email);  
    return buscarUsuarioPorEmail;
};

module.exports.hashPassword = async function (usuario) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(usuario.password, salt);
    return hashedPassword;
};

//buscar usuario por id
module.exports.buscarUsuarioPorId = async function (id) {
    let usuario =  await repoUsuarios.buscarUsuarioPorId(id);
    console.log("usuario-servicio");
    console.log(usuario);
    return usuario;
};


