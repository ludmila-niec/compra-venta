const express = require("express");
const userService = require("../services/usuario-service");
const router = express.Router();

router.post("/",(req, res) => {
    let usuario = req.body;
    console.log(usuario);
    let usuarioNuevo = userService.crearUsuario(usuario);
    res.json(usuarioNuevo);
});

router.get("/", (req, res) => {
    let usuarios = userService.listarUsuarios();
    res.json(usuarios);
});

module.exports = router;
