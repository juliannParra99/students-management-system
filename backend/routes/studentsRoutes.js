// userRoutes.js
const express = require('express');
const router = express.Router();
const studentsControllers = require('../controllers/studentsControlllers')


  router.get("/", studentsControllers.getAllStudents );
  
  // Configuración de una ruta POST "/create"
  router.post("/create", studentsControllers.createNewStudent);
  
  //update the date of a student with PUT with the student's Id which comes in the url
  router.put("/update/:id", studentsControllers.updateStudent);
  //get student for id to precharge the data when we want to update; it could be a good idea have in the frontend the possibiliete to use the data wich has got to pass it to the component update. Then wouldn't be necesary to make another consul to get data.
  router.get("/update/:id", studentsControllers.getStudentById)
  
  //delete student info
  router.delete("/student/:id", studentsControllers.deleteStudent);
  
module.exports = router;