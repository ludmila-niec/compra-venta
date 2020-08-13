const express = require("express");
const router = express.Router();
const productoServicio = require("../services/productos-service");
const { usuarioAutorizado } = require("../middleware/auth");
const { usuarios, realizarUnaCompra } = require("../db/database");

//Crear productos
router.post("/", usuarioAutorizado, (req, res) => {
  try {
    let nuevoProducto = req.body;
    let idUsuario = req.usuario.id;
    const { nombreProducto, precio, estado, descripcion } = nuevoProducto;
    // falta validacion inputs completos
    if (!(nuevoProducto && idUsuario)) {
      return res.status(400).json({
        Error: "Faltan datos para crear el producto",
      });
    } else {
      let resultado = productoServicio.crearProducto(nuevoProducto, idUsuario);
      if (resultado) {
        res.status(201).json(resultado);
      } else {
        res.status(400).json({ Error: "No se pudo crear el producto" });
      }
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

// retornar todos los productos
router.get("/", (req, res) => {
  let productos = productoServicio.listarProductos();
  res.json(productos);
});

router.post("/:idProducto", usuarioAutorizado, (req, res) => {
  try {
    let idUsuario = req.usuario.id;
    const idProducto = req.params.idProducto;
    let confirmaDeCompra = realizarUnaCompra(idProducto, idUsuario);
    if (confirmaDeCompra) {
      res.json(usuarios);
    }
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
