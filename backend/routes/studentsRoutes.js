// userRoutes.js
const express = require('express');
const router = express.Router();
const studentsControllers = require('../controllers/studentsControlllers')


  router.get("/", studentsControllers.getAllStudents );
  
  // Configuración de una ruta POST "/create"
  router.post("/create", studentsControllers.createNewStudent);
  
  //update the date of a student with PUT with the student's Id which comes in the url
  router.put("/update/:id", studentsControllers.updateStudent);
  
  //delete student info
  router.delete("/student/:id", studentsControllers.deleteStudent);
  
module.exports = router;