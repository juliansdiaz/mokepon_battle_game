const selectBtn = document.getElementById("select-button");
const restartBtn = document.getElementById("restart-button");
const selectAttackSection = document.getElementById("select-attack");
const restartSection = document.getElementById("restart");
const selectPetSection = document.getElementById("select-pet");
const playerPetSpan = document.getElementById("player-pet");
const enemyPetSpan = document.getElementById("enemy-pet");
const playerLives = document.getElementById("player-lives");
const enemyLives = document.getElementById("enemy-lives");
const messagesSection = document.getElementById("combat-result");
const playerAttackMessage = document.getElementById("player-attack-message");
const enemyAttackMessage = document.getElementById("enemy-attack-message");
const mokeponCardsContainer = document.getElementById("mokepon-cards");
const mokeponAttackContainer = document.getElementById("attacks-container");
const displayMapSection = document.getElementById("display-game-map");
const gameMap = document.getElementById("game-map");

let fireBtn;
let waterBtn;
let dirtBtn;
let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let mokeponChoice;
let playerPet;
let playerPetObj;
let mokeponAttacks;
let enemyMokeponAttacks;
let playerAttackIndex;
let enemyAttackIndex;
let enemyAttack = [];
let playerAttack = [];
let attackButtons = [];
let mokepons = [];
let playerWinsCount = 0;
let enemyWinsCount = 0;
let mapCanvas = gameMap.getContext("2d");
let gameMapBackground = new Image()
gameMapBackground.src = "./img/mokemap.png";
let interval;

class Mokepon {
  constructor(name, photo, lives, photoMap, x = 10, y = 10) {
    this.name = name;
    this.photo = photo;
    this.lives = lives;
    this.attacks = [];
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 35;
    this.mapPhoto = new Image()
    this.mapPhoto.src = photoMap;
    this.speedX = 0;
    this.speedY = 0;
  }

  DrawMokepon() {
    mapCanvas.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
  }
}

let hipodoge = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5, "./img/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5, "./img/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5, "./img/ratigueya.png");
let hipodogeEnemy = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5, "./img/hipodoge.png", 80, 120);
let capipepoEnemy = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5, "./img/capipepo.png", 150, 95);
let ratigueyaEnemy = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5, "./img/ratigueya.png", 200, 190);

hipodoge.attacks.push(
  { attackName: "💧", attackId: "water-attack-button" },
  { attackName: "💧", attackId: "water-attack-button" },
  { attackName: "💧", attackId: "water-attack-button" },
  { attackName: "🔥", attackId: "fire-attack-button" },
  { attackName: "🌱", attackId: "dirt-attack-button" }
);

capipepo.attacks.push(
  { attackName: "🌱", attackId: "dirt-attack-button" },
  { attackName: "🌱", attackId: "dirt-attack-button" },
  { attackName: "🌱", attackId: "dirt-attack-button" },
  { attackName: "💧", attackId: "water-attack-button" },
  { attackName: "🔥", attackId: "fire-attack-button" }
);

ratigueya.attacks.push(
  { attackName: "🔥", attackId: "fire-attack-button" },
  { attackName: "🔥", attackId: "fire-attack-button" },
  { attackName: "🔥", attackId: "fire-attack-button" },
  { attackName: "💧", attackId: "water-attack-button" },
  { attackName: "🌱", attackId: "dirt-attack-button" }
);

mokepons.push(hipodoge, capipepo, ratigueya);

function StartGame() {
  mokepons.forEach((mokepon) => {
    mokeponChoice = `
    <input type="radio" name="pet" id=${mokepon.name}>
      <label for=${mokepon.name} class="mokepon-card">
        <p>${mokepon.name}</p>
        <img src=${mokepon.photo} alt=${mokepon.name}>
      </label>
    `
    mokeponCardsContainer.innerHTML += mokeponChoice;

    hipodogeInput = document.getElementById("Hipodoge");
    capipepoInput = document.getElementById("Capipepo");
    ratigueyaInput = document.getElementById("Ratigueya");
  })

  selectBtn.addEventListener("click", SelectPlayerPet);
  restartBtn.addEventListener("click", RestartGame);

  selectAttackSection.style.display = "none";
  restartSection.style.display = "none";
  displayMapSection.style.display = "none";
}

function SelectPlayerPet() {
  //selectAttackSection.style.display = "flex";
  selectPetSection.style.display = "none";

  if (hipodogeInput.checked) {
    playerPetSpan.innerHTML = hipodogeInput.id;
    playerPet = hipodogeInput.id;
  }
  else if (capipepoInput.checked) {
    playerPetSpan.innerHTML = capipepoInput.id;
    playerPet = capipepoInput.id;
  }
  else if (ratigueyaInput.checked) {
    playerPetSpan.innerHTML = ratigueyaInput.id;
    playerPet = ratigueyaInput.id;
  }
  else {
    alert("Debes seleccionar a una mascota!");
    RestartGame();
  }

  PullAttacks(playerPet);
  displayMapSection.style.display = "flex";
  DisplayMap();
  SelectEnemyPet();
}

function SelectEnemyPet() {
  let selectedPet = GenerateRandomNumber(0, mokepons.length - 1);

  enemyPetSpan.innerHTML = mokepons[selectedPet].name;
  enemyMokeponAttacks = mokepons[selectedPet].attacks;

  AttackSequence();
}

function RandomEnemyAttack() {
  let selectedEnemyAttack = GenerateRandomNumber(0, enemyMokeponAttacks.length - 1);

  if (selectedEnemyAttack === 0 || selectedEnemyAttack === 1) {
    enemyAttack.push("FUEGO");
  }
  else if (selectedEnemyAttack === 3 || selectedEnemyAttack === 4) {
    enemyAttack.push("AGUA");
  }
  else {
    enemyAttack.push("TIERRA");
  }

  StartFight();
}

function Combat() {
  for (let i = 0; i < playerAttack.length; i++) {
    if (playerAttack[i] === enemyAttack[i]) {
      MokeponAttackHandler(i, i);
      CreateBattleMessage("EMPATE");
    }
    else if (playerAttack[i] === "FUEGO" && enemyAttack[i] === "TIERRA") {
      MokeponAttackHandler(i, i);
      CreateBattleMessage("GANASTE!!");
      playerWinsCount++;
      playerLives.innerHTML = playerWinsCount;
    }
    else if (playerAttack[i] === "AGUA" && enemyAttack[i] === "FUEGO") {
      MokeponAttackHandler(i, i);
      CreateBattleMessage("GANASTE!!");
      playerWinsCount++;
      playerLives.innerHTML = playerWinsCount;
    }
    else if (playerAttack[i] === "TIERRA" && enemyAttack[i] === "AGUA") {
      MokeponAttackHandler(i, i);
      CreateBattleMessage("GANASTE!!");
      playerWinsCount++;
      playerLives.innerHTML = playerWinsCount;
    }
    else {
      MokeponAttackHandler(i, i);
      CreateBattleMessage("PERDISTE...");
      enemyWinsCount++;
      enemyLives.innerHTML = enemyWinsCount;
    }
  }

  CheckWinCount();
}

function MokeponAttackHandler(player, enemy) {
  playerAttackIndex = playerAttack[player];
  enemyAttackIndex = enemyAttack[enemy];
}

function CheckWinCount() {
  if (playerWinsCount === enemyWinsCount) {
    CreateGameOverMessage("FIN DEL JUEGO!!! HAY EMPATE!!!");
  }
  else if (playerWinsCount > enemyWinsCount) {
    CreateGameOverMessage("FIN DEL JUEGO!!! JUGADOR GANA!!!");
  }
  else {
    CreateGameOverMessage("FIN DEL JUEGO!!! ENEMIGO GANA!!!");
  }
}

function CreateBattleMessage(battleResult) {
  let newPlayerBattleMessage = document.createElement("p");
  let newEnemyBattleMessage = document.createElement("p");

  messagesSection.innerHTML = battleResult;
  newPlayerBattleMessage.innerHTML = playerAttackIndex;
  newEnemyBattleMessage.innerHTML = enemyAttackIndex;

  playerAttackMessage.appendChild(newPlayerBattleMessage);
  enemyAttackMessage.appendChild(newEnemyBattleMessage);
}

function CreateGameOverMessage(gameOverResult) {
  messagesSection.innerHTML = gameOverResult;
  restartSection.style.display = "block";
}

function PullAttacks(playerSelectedPet) {
  let petAttacks;
  for (let i = 0; i < mokepons.length; i++) {
    if (playerSelectedPet === mokepons[i].name) {
      petAttacks = mokepons[i].attacks;
    }
  }

  DisplayAttacks(petAttacks);
}

function DisplayAttacks(selectedAttacks) {
  selectedAttacks.forEach((attacks) => {
    mokeponAttacks = `<button id=${attacks.attackId} class="attack-button attackBtn">${attacks.attackName}</button>`;
    mokeponAttackContainer.innerHTML += mokeponAttacks;
  })

  fireBtn = document.getElementById("fire-attack-button");
  waterBtn = document.getElementById("water-attack-button");
  dirtBtn = document.getElementById("dirt-attack-button");
  attackButtons = document.querySelectorAll(".attackBtn");
}

function AttackSequence() {
  attackButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        playerAttack.push("FUEGO");
        button.style.background = "#112F58";
        button.disabled = true;
      }
      else if (e.target.textContent === "💧") {
        playerAttack.push("AGUA");
        button.style.background = "#112F58";
        button.disabled = true;
      }
      else {
        playerAttack.push("TIERRA");
        button.style.background = "#112F58";
        button.disabled = true;
      }
      RandomEnemyAttack()
    })
  })
}

function StartFight() {
  if (playerAttack.length === 5) {
    Combat();
  }
}

function RestartGame() {
  location.reload();
}

function GenerateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function DrawCanvas() {
  playerPetObj.x = playerPetObj.x + playerPetObj.speedX;
  playerPetObj.y = playerPetObj.y + playerPetObj.speedY;
  mapCanvas.clearRect(0, 0, gameMap.width, gameMap.height);
  mapCanvas.drawImage(gameMapBackground, 0, 0, gameMap.width, gameMap.height);
  
  playerPetObj.DrawMokepon();
  hipodogeEnemy.DrawMokepon();
  capipepoEnemy.DrawMokepon();
  ratigueyaEnemy.DrawMokepon();

  if(playerPetObj.speedX !== 0 || playerPetObj.speedY !== 0) {
    CheckCollision(hipodogeEnemy);
    CheckCollision(capipepoEnemy);
    CheckCollision(ratigueyaEnemy);
  }
}

function MoveMokeponRight() {
  playerPetObj.speedX = 5;
}

function MoveMokeponLeft() {
  playerPetObj.speedX = -5;
}

function MoveMokeponDown() {
  playerPetObj.speedY = 5;
}

function MoveMokeponUp() {
  playerPetObj.speedY = -5;
}

function StopMovement() {
  playerPetObj.speedX = 0;
  playerPetObj.speedY = 0;
}

function KeyPressed(event) {
  switch (event.key) {
    case "ArrowUp":
      MoveMokeponUp();
      break;
    case "ArrowDown":
      MoveMokeponDown();
      break;
    case "ArrowLeft":
      MoveMokeponLeft();
      break;
    case "ArrowRight":
      MoveMokeponRight();
      break;
    default:
      break;
  }
}

function DisplayMap() {
  gameMap.width = 320;
  gameMap.height = 240;
  playerPetObj = PullSelectedPet(playerPet);
  interval = setInterval(DrawCanvas, 50);

  window.addEventListener("keydown", KeyPressed);
  window.addEventListener("keyup", StopMovement);
}

function PullSelectedPet() {
  for (let i = 0; i < mokepons.length; i++) {
    if (playerPet === mokepons[i].name) {
      return mokepons[i];
    }
  }
}

function CheckCollision(enemyPet) {
  const enemyPetUp = enemyPet.y;
  const enemyPetDown = enemyPet.y + enemyPet.height;
  const enemyPetRight = enemyPet.x + enemyPet.width;
  const enemyPetLeft = enemyPet.x;

  const playerPetUp = playerPetObj.y;
  const playerPetDown = playerPetObj.y + playerPetObj.height;
  const playerPetRight = playerPetObj.x + playerPetObj.width;
  const playerPetLeft = playerPetObj.x;

  if ((playerPetDown < enemyPetUp) || (playerPetUp > enemyPetDown) || (playerPetRight < enemyPetLeft) || (playerPetLeft > enemyPetRight)) {
    return;
  }
  else {
    alert("Hay Colision con " + enemyPet.name);
    StopMovement();
  }
}

window.addEventListener("load", StartGame);