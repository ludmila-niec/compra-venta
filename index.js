const express = require("express");
const app = express();
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");

app.use(express.json());
//routes
app.use("/usuarios", userRoute);
app.use("/productos", productRoute);
app.use(express.static("public"));
app.listen(3002, () => {
    console.log("server init 3002");
});
