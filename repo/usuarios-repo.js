const sql = require("../conexion/conexion")

module.exports.getUsuarios = async() => {
    return new Promise((r, rej) => {
        sql.query('SELECT * FROM usuarios').then(resultado => {
            r(resultado[0]);
        })
    })
}
module.exports.registrarUsuario = async(usuario) => {
    return new Promise((res, rej) => {
        sql.query(`
            INSERT INTO usuarios
            (nombre, apellido,email,password)
            values (?,?,?,?)
            `, { replacements: [usuario.nombre, usuario.apellido, usuario.email, usuario.password], type: sql.QueryTypes.INSERT }).then(resultado => {
            console.log(resultado);
            res(resultado);
        })
    })
}