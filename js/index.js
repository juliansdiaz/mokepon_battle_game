const express = require("express"); //import expressJS 
const cors = require("cors");

const application = express(); //create server application
application.use(cors());
application.use(express.json());

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }

  AssignMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  UpdatePosition(x, y) {
    this.x = x;
    this.y = y; 
  }
}

class Mokepon {
  constructor(name) {
    this.name = name;
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

application.post("/mokepon/:playerId", (req, res) => {
  const playerId = req.params.playerId || "";
  const name = req.body.mokepon || "";
  const mokepon = new Mokepon(name);

  const playerIndex = players.findIndex((player) => playerId === player.id);
  if(playerIndex >= 0) {
    players[playerIndex].AssignMokepon(mokepon);
  }

  res.end();
});

application.post("/mokepon/:playerId/position", (req, res) => {
  const playerId = req.params.playerId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const playerIndex = players.findIndex((player) => playerId === player.id);
  if(playerIndex >= 0) {
    players[playerIndex].UpdatePosition(x ,y);
  }

  const enemies = players.filter((player) => playerId !== player.id);

  res.send({
    enemies
  });
})

//Start server
application.listen(8080, () => {
  console.log("Servidor funcionando");
});