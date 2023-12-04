const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser")
const credentials = require ("./middleware/credentials")
const corsOptions = require("./config/corsOptions");

const studentsRoutes = require("./routes/studentsRoutes");
const registerRoute = require("./routes/register")
const userAuth = require('./routes/auth');
const verifyJWT = require('./middleware/verifyJWT');


const PORT = process.env.PORT || 8081;

// Handle options credentials check - before CORS!!
// and fetch cookies credentials requirement
app.use(credentials);


// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
//middleware for cookies
app.use(cookieParser())


//serve static files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use("/register", registerRoute)
app.use("/auth", userAuth)
//el orden es importante cuando hablamos de register y auth y tokens como JWT. Primero register y auth, despues refersh token y despues verificacion de jwt para el acceso; el resresh token recibe la cookie que contiene el refresh token
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))
//use the modules in the router folder
//para dar acceso a rutas protegidas con JWT. Las rutas que estan abajo de verifyJWT se protegen

app.use(verifyJWT)
app.use("/", studentsRoutes)


// Obtener el puerto de la variable de entorno o usar uno por defecto; util para usar otro puerto si lo queremos desplegar.


app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
