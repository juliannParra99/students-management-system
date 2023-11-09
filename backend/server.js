const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());

// Configura los parámetros de conexión a tu base de datos
const db = mysql.createConnection({
  host: "localhost", // Host de la base de datos
  user: "root", // Usuario de la base de datos
  password: "123456789river", // Contraseña del usuario
  database: "students_management", // Nombre de la base de datos
});


app.get("/", (req,res) => {
    res.json("hey from the server")
});

app.listen(8081, () => {
  console.log("Server is running on port: ", 8081);
});
