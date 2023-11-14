const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

// Configura los parámetros de conexión a tu base de datos
const db = mysql.createConnection({
  host: "localhost", // Host de la base de datos
  user: "root", // Usuario de la base de datos
  password: "123456789river", // Contraseña del usuario
  database: "students_management", // Nombre de la base de datos
});

app.get("/", (req, res) => {
  // SQL query to select all columns from the "students" table
  const sqlGet = "SELECT * FROM students";

  // Execute the SQL query using the database connection (db)
  db.query(sqlGet, (error, data) => {
    // Check if there is an error in executing the SQL query: Error handle
    if (error) {
      // Log the error details to the console
      console.error("Error executing query:", error);

      // Send a JSON response with the error information and a 500 Internal Server Error status
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    } else {
      // Send a JSON response with the retrieved data and a 200 OK status
      res.status(200).json(data);
    }
  });
});

// Configuración de una ruta POST "/create"
app.post("/create", (req, res) => {
  // Consulta SQL para insertar datos en la tabla 'student'
  const sqlPost = "INSERT INTO students (`Name`, `Email`) VALUES (?)";

  // (?) es un marcador de posicion donde se van a agregar los datos de 'values'
  // Los valores a insertar, tomados del cuerpo de la solicitud (req.body)
  const values = [
    req.body.name, // Valor del campo 'name' enviado en la solicitud
    req.body.email, // Valor del campo 'email' enviado en la solicitud
  ];

  // Ejecución de la consulta a la base de datos usando db.query
  db.query(sqlPost, [values], (error, data) => {
    // Verificación de errores en la ejecución de la consulta
    if (error) {
      // En caso de error, imprime el error en la consola y devuelve una respuesta de error al cliente
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    } else {
      // Si la consulta se ejecuta correctamente, devuelve los datos obtenidos de la base de datos al cliente
      console.log("Added succesfully")
      return res.status(200).json(data);
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port: ", 8081);
});
