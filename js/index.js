const express = require("express"); //import expressJS 

const application = express(); //create server application

//Allows server to respond to requests
application.get("/", (req, res) => {
    res.send("Hola") //Send server response
});

//Start server
application.listen(8080, () => {
    console.log("Servidor funcionando");
});