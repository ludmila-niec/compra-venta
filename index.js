const express = require("express");
const app = express();
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
app.use(express.urlencoded({ extended: false }));

//routes
app.use(express.json());
//app.use(cors);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use(express.static("public"));
//de esta manera se puede acceder al formulario de registro 'localhost:3002/'

app.listen(3002, () => {
    console.log("server init 3002");
});
