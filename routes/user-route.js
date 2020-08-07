const express = require("express");
const usuarioServicio = require("../services/usuario-service");
const router = express.Router();

//registra usuario nuevo
router.post("/", async (req, res) => {
    try {
        let usuario = req.body;
        const { nombre, apellido, email, password } = usuario;
        if (!(nombre && apellido && email && password)) {
            res.status(400).send({ Error: "Campos incompletos" });
        }
        //encriptar password
        const hashedPassword = await usuarioServicio.hashPassword(usuario);
        //agregamos el hashpassword a la propiedad password en body request
        usuario.password = hashedPassword;
        let usuarioNuevo = usuarioServicio.crearUsuario(usuario);
        res.status(201).json(usuarioNuevo);
    } catch (error) {
        res.status(400).json({ Error: error.message });
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
