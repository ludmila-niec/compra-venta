const express = require("express");
const router = express.Router();
const productoServicio = require("../services/productos-service");

//Crear productos
router.post("/", (req, res) => {
    try {
        let nuevoProducto = req.body;
        const { nombreProducto, precio, estado, descripcion } = nuevoProducto
        let idUsuario = req.headers.id;
        // validacion inputs completos
        if (!(nuevoProducto && idUsuario)) {
            res.status(400).json({ Error: 'Faltan datos para crear el producto' })
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

//retornar todos los productos
router.get("/", (req, res) => {
    let productos = productoServicio.listarProductos();
    res.json(productos);
});
module.exports = router;