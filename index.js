const express = require("express");
const app = express();
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const cookieParser = require("cookie-parser");
const { usuarioAutorizado } = require("./middleware/auth");

app.use(express.json());
app.use(express.static("public"));

//cookie parser
app.use(cookieParser());

//routes
app.use("/usuarios", userRoute);
app.use("/productos", productRoute);

// conexion


//ruta al inicio una vez iniciada la sesion
app.get("/inicio", usuarioAutorizado, (req, res) => {
    res.sendFile("./public/dashboard.html", { root: __dirname });
    console.log("inicio sesion");
    console.log(req.usuario.id);
});

// app.get('/inicio/misdatos', usuarioAutorizado, (req, res) =>{
//     res.sendFile("./public/datos-usuario.html", { root: __dirname });
// })
// app.get('/inicio/misproductos', usuarioAutorizado, (req, res) =>{
//     res.sendFile("./public/mis-productos.html", { root: __dirname });
// })
// app.get('/inicio/miscompras', usuarioAutorizado, (req, res) =>{
//     res.sendFile("./public/mis-compras.html", { root: __dirname });
// })
// app.get('/inicio/crearproducto', usuarioAutorizado, (req, res) =>{
//     res.sendFile("./public/crear-producto.html", { root: __dirname });
// })

app.listen(3002, () => {
    console.log("server init 3002");
});