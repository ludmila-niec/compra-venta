const express = require("express");
const router = express.Router();
const productoServicio = require("../services/productos-service");

//Crear productos
router.post("/", (req, res) => {
    try {
        let nuevoProducto = req.body;
        const { nombreProducto, precio, estado, descripcion } = nuevoProducto;
        let idUsuario = req.headers.id;
        // validacion inputs completos
        if (!(nuevoProducto && idUsuario)) {
            res.status(400).json({
                Error: "Faltan datos para crear el producto",
            });
        } else {
            let resultado = productoServicio.crearProducto(
                nuevoProducto,
                idUsuario
            );
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
// router.get("/", (req, res) => {
//     let productos = productoServicio.listarProductos();
//     res.json(productos);
// });

//retorna productos de una busqueda particular
router.get("/", (req, res) => {
    let palabraClave = req.query.buscar
    if (palabraClave == undefined) {
        //retornar todos los productos
        let productos = productoServicio.listarProductos();
        res.status(200).json({ exito: true, data: productos });
        return;
    }

    let listaDeProductos = productoServicio.buscarProductoPorNombre(
        palabraClave
    );
    if (listaDeProductos == null) {
        res.status(404).json({
            exito: false,
            data: "No se encontraron productos",
        });
        return;
    }
    res.status(200).json({ exito: true, data: listaDeProductos });
});

//retorna lista de productos segun su estado
//ahora hace el filtro sobre todos los productos
router.get("/:estado", (req, res) => {
    let estadoProducto = req.params.estado;
    if (estadoProducto === "nuevo") {
        let listaDeProductos = productoServicio.buscarProductoNuevo();
        if (listaDeProductos == null) {
            res.status(404).json({
                exito: false,
                data: "No se encontraron productos nuevos",
            });
            return;
        } else {
            res.status(200).json({ exito: true, data: listaDeProductos });
            return;
        }
    }

    if (estadoProducto === "usado") {
        let listaDeProductos = productoServicio.buscarProductoUsado();
        if (listaDeProductos == null) {
            res.status(404).json({
                exito: false,
                data: "No se encontraron productos usados",
            });
            return;
        } else {
            res.status(200).json({ exito: true, data: listaDeProductos });
            return;
        }
    }
});

module.exports = router;
