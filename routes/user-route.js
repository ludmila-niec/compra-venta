const express = require("express");
const jwt = require("jsonwebtoken");
const usuarioServicio = require("../services/usuario-service");
const usuriosRepo = require('../repositorio/usuarios.repositorio');
const router = express.Router();
//const SECRET_JWT = "skfnsiLSAOAsd5aslsk87sn";
const SECRET_JWT = "SECRETO";

const { usuarioAutorizado } = require("../middleware/auth");
//despues guardamos los 'secretos' en variables de entorno

//Api rest endpoints
router.get('/', async (req, res)=>{
    try{
        let listadoUsuarios = await usuriosRepo.getUsuarios();
        res.status(200).send(listadoUsuarios);
    }catch(error){
        console.log(error.message);
        res.status(500).json({ err: error.message });
    }
});

// router.post("/", async (req, res) => {
//     try {
//         let usuario = req.body;
//         let validacion = usuarioServicio.validarCamposNuevoUsuario(usuario);
//         if (validacion.length > 0) {
//             return res.status(400).json({ exito: false, data: validacion }); 
//         }
//         //encriptar password
//         const hashedPassword = await usuarioServicio.hashPassword(usuario);
//         usuario.password = hashedPassword;
//         let usuarioNuevo = usuarioServicio.crearUsuario(usuario);
//         //checkear resultado e informar en front
//        return res.status(201).json({ exito: true, data: usuarioNuevo });    
//     } catch (error) {
//         res.status(500).json({ Error: error.message });
//     }
// });
//registra usuario nuevo
router.post("/", async (req, res) => {
    try {
        let usuario = req.body;
        let validacion = await usuarioServicio.validarCamposNuevoUsuario(usuario);
        if (validacion.length > 0) {
            return res.status(400).json({ exito: false, data: validacion }); 
        }
        // Encriptar password
        const hashedPassword = await usuarioServicio.hashPassword(usuario);
        usuario.password = hashedPassword;
        let usuarioNuevo = await usuriosRepo.registrarUsuario(usuario);
        // //checkear resultado e informar en front
       return res.status(201).json({ exito: true, data: usuarioNuevo });    
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

//Handler del inicio de sesion
// router.post("/iniciarsesion", async (req, res) => {
//     let usuario = req.body;
//     try {
//         //checkeo email y contraseña valida
//         let validacion = await usuarioServicio.validarCamposInicioSesion(
//             usuario
//         );
//         if (validacion.length > 0) {
//             res.status(400).json({ exito: false, data: validacion });
//             return;
//         }
//         //buscar id del usuario
//         let usuarioDataStore = usuarioServicio.buscarUsuarioPorEmail(
//             req.body.email
//         );
//         //generar Token
//         let token = jwt.sign(
//             {
//                 id: usuarioDataStore.id,
//                 nombre: usuarioDataStore.nombre,
//             },
//             SECRET_JWT
//         );

//         //agrego el token a la cookie
//         res.cookie("token", token, { httpOnly: true });
//         res.status(200).send({ exito: true, data: "Login Ok" });
//     } catch (err) {
//         res.status(500).json({ Error: err.message });
//     }
// });

router.post("/iniciarsesion", async (req, res) => {
    let usuario = req.body; // email, password
    try {
        //checkeo email y contraseña valida
        let validacion = await usuarioServicio.validarCamposInicioSesion(usuario);
        console.log("validacion");
        console.log(validacion);

        if (validacion.length > 0) {
            res.status(400).json({ exito: false, data: validacion });
            return;
        }

        //buscar id del usuario
        console.log(req.body.email)
        let usuarioDataStore = await usuarioServicio.buscarUsuarioPorEmail(req.body.email);        
        usuarioDataStore = usuarioDataStore[0];
        console.log("usuarioDataStore");
        console.log(usuarioDataStore);

        //generar Token
        let token = jwt.sign(
            {
                id: usuarioDataStore.id,
                nombre: usuarioDataStore.nombre,
            },
            SECRET_JWT
        );
        console.log(token);
        
        //agrego el token a la cookie
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send({ exito: true, data: "Login Ok" });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//Retorna la lista de usuarios
router.get("/", usuarioAutorizado, (req, res) => {
    console.log(req.usuario.id);
    let usuarioId = req.usuario.id;
    //ahora devuelve informacion del usuario por id.
    //fetch de los datos del usuario para mostrar en el front
    let usuario = usuarioServicio.buscarUsuarioPorId(usuarioId);
    res.status(200).json({ exito: true, data: usuario });
});

module.exports = router;
