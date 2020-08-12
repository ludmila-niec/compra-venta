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

//ruta al inicio una vez iniciada la sesion
app.get("/inicio", usuarioAutorizado, (req, res) => {
    res.send("ESTO ES EL INICIO");
    console.log("inicio sesion");
    console.log(req.usuario.id);
});

app.listen(3002, () => {
    console.log("server init 3002");
});
