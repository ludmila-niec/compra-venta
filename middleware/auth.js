const jwt = require("jsonwebtoken");
//middelware de autorizacion mediante token
module.exports.usuarioAutorizado = function (req, res, next) {
    try {
        let token = req.cookies["token"];
        if (!token) {
            return res
                .status(401)
                .send("Tenes que iniciar sesion para acceder a este contenido");
        }
        let verificarToken = jwt.verify(token, process.env.SECRET_JWT);
        if (verificarToken) {
            req.usuario = verificarToken;
            return next();
        }
    } catch (error) {
        res.status(400).send("Error al validar usuario");
    }
};
