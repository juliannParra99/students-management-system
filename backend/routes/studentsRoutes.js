// userRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require("mysql2");


// Configura los parámetros de conexión a tu base de datos
const db = mysql.createConnection({
    host: "localhost", // Host de la base de datos
    user: "root", // Usuario de la base de datos
    password: "123456789river", // Contraseña del usuario
    database: "students_management", // Nombre de la base de datos
  });
  
  router.get("/", (req, res) => {
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
  router.post("/create", (req, res) => {
    const sqlPost = "INSERT INTO students (`Name`, `Email`) VALUES (?)";
  
    const values = [
      req.body.name, 
      req.body.email,
    ];
  
    
    db.query(sqlPost, [values], (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: error });
      } else {
        console.log("Added succesfully")
        return res.status(200).json(data);
      }
    });
  });
  
  //update the date of a student with PUT with the student's Id which comes in the url
  router.put("/update/:id", (req, res) => {
    const sqlPut = "update students set `Name` = ?, `Email`= ?  where ID = ? ";
  
    //en esta parte el backend extrae los datos que le fueron enviados en el front en :
    //axios.put("http://localhost:8081/update/"+ id , { name, email })
  
    const values = [
      req.body.name, 
      req.body.email,
    ];
  
    const id = req.params.id;
  
    // Esta expresión utiliza el spread operator (...) para expandir los valores del array values y luego agrega el id al final del array.
    db.query(sqlPut, [...values, id], (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: error });
      } else {
        console.log("Updated succesfully")
        return res.status(200).json(data);
      }
    });
  });
  
  //delete student info
  router.delete("/student/:id", (req, res) => {
    const sqlDelete = "DELETE FROM students  WHERE ID = ? ";
  
    const id = req.params.id;
  
    db.query(sqlDelete, [id], (error, data) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: error });
      } else {
        console.log("Deleted succesfully")
        return res.status(200).json(data);
      }
    });
  });
  
module.exports = router;