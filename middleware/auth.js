const jwt = require("jsonwebtoken");

//cookie
module.exports.usuarioAutorizado = function (req, res, next) {
    let token = req.cookies["token"];
    //verificar si tiene token
    try {
        if (!token) {
            return res
                .status(401)
                .send("Tenes que iniciar sesion para acceder a este contenido");
        }
        const verificarToken = jwt.verify(token, process.env.SECRET_JWT);
        if (verificarToken) {
            req.usuario = verificarToken;
            return next();
        }
    } catch (error) {
        res.status(400).send("Error al validar usuario");
    }
};
