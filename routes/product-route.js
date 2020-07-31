const express = require("express");
const router = express.Router();
const productoService = require("../services/productos-service");

//ahora la ruta es /products.solo para agregar productos
router.post("/", (req, res) => {
    try {
        let nuevoProducto = req.body;
        let idUser = req.headers.id;
        console.log(idUser);
        let result = productoService.crearProducto(nuevoProducto, idUser);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});
module.exports = router;
