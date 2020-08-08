const express = require("express");
const app = express();
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");

app.use(express.json());
//routes
app.use("/usuarios", userRoute);
app.use("/productos", productRoute);
app.use(express.static("public"));

//Rutas para navegar
//ruta registro
app.get("/registro", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

//ruta login
app.get("/iniciarsesion", (req, res) => {
    res.sendFile("./public/login.html", { root: __dirname });
});

//ruta al inicio una vez iniciada la sesion
app.get("/inicio", (req, res) => {
    res.send("ESTO ES EL INICIO");
});

app.listen(3002, () => {
    console.log("server init 3002");
});
