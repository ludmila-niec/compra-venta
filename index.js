const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const cookieParser = require("cookie-parser");
const { usuarioAutorizado } = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.static("public"));

//cookie parser
app.use(cookieParser());

//routes
app.use("/usuarios", userRoute);
app.use("/productos", productRoute);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//ruta al inicio una vez iniciada la sesion
app.get("/inicio", usuarioAutorizado, (req, res) => {
    // res.sendFile("./public/dashboard.html", { root: __dirname });
    res.sendFile(path.resolve(__dirname, "public", "dashboard.html"));
    console.log("inicio sesion");
    console.log(req.usuario.id);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server init");
});
