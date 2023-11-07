const express = require('express'); 
const app = express();
const cors = require('cors');

app.listen(8081, ()=>{
    console.log("Server is running on port: ", 8081);
} )