const express = require("express"); //import expressJS 

const application = express(); //create server application
const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }
}

//Allows server to respond to requests
application.get("/join", (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);
  players.push(player);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(id); //Send server response

});

//Start server
application.listen(8080, () => {
  console.log("Servidor funcionando");
});