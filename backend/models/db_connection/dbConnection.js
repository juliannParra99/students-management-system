const mysql = require("mysql2");

// Configura los parámetros de conexión a tu base de datos
const db = mysql.createConnection({
  host: "localhost", // Host de la base de datos
  user: "root", // Usuario de la base de datos
  password: "123456789river", // Contraseña del usuario
  database: "students_management", // Nombre de la base de datos
});

module.exports = db;