const  Sequelize  = require('sequelize');
const sql = new Sequelize('mysql://root@localhost:3306/workshop');

//Chequear conexion con con base de datos
sql.authenticate()
  .then(() => {
    console.log("Database conectada");
})
  .catch((error) => {
    console.log(error.message);
});

module.exports = sql;