const express = require("express");
const userService = require("../services/usuario-service");
const router = express.Router();

router.post("/", (req, res) => {
  // let usuario = req.body;
  // console.log(usuario);
  // let usuarioNuevo = userService.crearUsuario(usuario);
  // res.json(usuarioNuevo);

  try {
    let usuario = req.body;
    let usuarioNuevo = userService.crearUsuario(usuario);
    if (usuarioNuevo) {
      res.json(usuarioNuevo);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/", (req, res) => {
  let usuarios = userService.listarUsuarios();
  res.json(usuarios);
});

module.exports = router;
