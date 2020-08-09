const express = require("express");
const app = express();
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");

app.use(express.json());
app.use(express.static("public"));
//routes
app.use("/usuarios", userRoute);
app.use("/productos", productRoute);

//ruta al inicio una vez iniciada la sesion
app.get("/inicio", (req, res) => {
    res.send("ESTO ES EL INICIO");
});

app.listen(3002, () => {
    console.log("server init 3002");
});
