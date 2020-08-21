const Sequelize = require('sequelize');
const sql = new Sequelize('mysql://root@localhost:3306/db');
// connecting to the database

//checking connection to the database
sql.authenticate()
    .then(() => {
        console.log("database connected");
    })
    .catch((error) => {
        console.log(error.message);
    });

module.exports = sql;