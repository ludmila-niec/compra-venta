const express = require("express");
const usuarioServicio = require("../services/usuario-service");
const router = express.Router();

//registra usuario nuevo
router.post("/", async (req, res) => {
    try {
        let usuario = req.body;
        let validacion = usuarioServicio.validarCamposNuevoUsuario(usuario);
        if (validacion.length > 0) {
            res.status(400).json({ exito: false, data: validacion });
            return;
        }
        //encriptar password
        const hashedPassword = await usuarioServicio.hashPassword(usuario);
        usuario.password = hashedPassword;
        let usuarioNuevo = usuarioServicio.crearUsuario(usuario);
        //checkear resultado e informar en front
        res.status(201).json({ exito: true, data: usuarioNuevo });
        return;
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

//Handler del inicio de sesion
router.post("/iniciarsesion", async (req, res) => {
    let usuario = req.body;
    try {
        //checkeo email y contraseña valida
        let validacion = await usuarioServicio.validarCamposInicioSesion(
            usuario
        );
        if (validacion.length > 0) {
            res.status(400).json({ exito: false, data: validacion });
            return;
        }
        // res.status(200).json({ mensaje: "Login ok" });
        //fijarse como redireccionar al 'inicio'
        res.redirect("/inicio");
        //En postman funciona
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//Retorna la lista de usuarios
router.get("/", (req, res) => {
    let usuarios = usuarioServicio.listarUsuarios();
    res.json(usuarios);
});

module.exports = router;
