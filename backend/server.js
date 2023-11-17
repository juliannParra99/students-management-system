const express = require("express");
const app = express();
const cors = require("cors");
const studentsRoutes = require("./routes/studentsRoutes");


app.use(cors());
app.use(express.json());
//use the modules in the router folder
app.use("/", studentsRoutes)



app.listen(8081, () => {
  console.log("Server is running on port: ", 8081);
});
