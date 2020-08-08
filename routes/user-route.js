const express = require("express");
const path = require("path");
const usuarioServicio = require("../services/usuario-service");
const router = express.Router();

//GET form para registrar usuario
// router.get("/registro", (req, res) => {
//     res.sendFile("../public/index.html", { root: __dirname });
// });

//registra usuario nuevo
router.post("/", async (req, res) => {
    try {
        let usuario = req.body;
        // const { nombre, apellido, email, password } = usuario;
        // if (!(nombre && apellido && email && password)) {
        //     res.status(400).send({exito: false, data: "Campos incompletos" });
        // }
        let validacion = usuarioServicio.validarCamposNuevoUsuario(usuario);
        if (validacion.length > 0) {
            res.status(400).json({ exito: false, data: validacion });
            return;
        }

        //encriptar password
        const hashedPassword = await usuarioServicio.hashPassword(usuario);
        //agregamos el hashpassword a la propiedad password en body request
        usuario.password = hashedPassword;
        let usuarioNuevo = usuarioServicio.crearUsuario(usuario);
        res.status(201).json({ exito: true, data: usuarioNuevo });
        return;
    } catch (error) {
        console.log(error);
    }
});

//Retorna la lista de usuarios
router.get("/", (req, res) => {
    let usuarios = usuarioServicio.listarUsuarios();
    res.json(usuarios);
});

//generar login
router.post("/login", (req, res) => {});

module.exports = router;
