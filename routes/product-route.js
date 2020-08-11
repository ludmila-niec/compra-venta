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

//retorna productos de una busqueda particular
//retorna productos por estado (nuevo/usado)
router.get("/", (req, res) => {
    try {
        const palabraClave = req.query.buscar;
        const estado = req.query.estado;
        if (!palabraClave) {
            return res
                .status(404)
                .json({ exito: false, data: "No se encontraron productos" });
        }
        //buscar productos con la palabra clave
        let listaDeProductos = productoServicio.buscarProductoPorPalabraClave(
            palabraClave
        );
        if (listaDeProductos == null) {
            return res.status(404).json({
                exito: false,
                data: "No se encontraron productos",
            });
        }
        //si no se solicita filtrar por estado, retornar lista de productos encontrados
        if (!estado) {
            return res
                .status(200)
                .json({ exito: true, data: listaDeProductos });
        }

        //filtrar productos encontrados por estado
        let listaFiltradaEstado = productoServicio.filtrarPorEstado(
            listaDeProductos,
            estado
        );
        if (listaFiltradaEstado == null) {
            return res.status(404).json({
                exito: false,
                data: "No se encontraron productos",
            });
        }

        return res.status(200).json({ exito: true, data: listaFiltradaEstado });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
