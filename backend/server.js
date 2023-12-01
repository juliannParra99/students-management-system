const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

const studentsRoutes = require("./routes/studentsRoutes");
const registerRoute = require("./routes/register")
const userAuth = require('./routes/auth');
const verifyJWT = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());
// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use("/register", registerRoute)
app.use("/auth", userAuth)
//use the modules in the router folder
//para dar acceso a rutas protegidas con JWT. Las rutas que estan abajo de verifyJWT se protegen
app.use(verifyJWT)
app.use("/", studentsRoutes)


// Obtener el puerto de la variable de entorno o usar uno por defecto; util para usar otro puerto si lo queremos desplegar.


app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
