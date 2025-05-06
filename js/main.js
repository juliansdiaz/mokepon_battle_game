const selectBtn = document.getElementById("select-button");
const fireBtn = document.getElementById("fire-attack-button");
const waterBtn = document.getElementById("water-attack-button");
const dirtBtn = document.getElementById("dirt-attack-button");
const restartBtn = document.getElementById("restart-button");
const selectAttackSection = document.getElementById("select-attack");
const restartSection = document.getElementById("restart");
const selectPetSection = document.getElementById("select-pet");
const hipodogeInput = document.getElementById("hipodoge");
const capipepoInput = document.getElementById("capipepo");
const ratigueyaInput = document.getElementById("ratigueya");
const playerPetSpan = document.getElementById("player-pet");
const enemyPetSpan = document.getElementById("enemy-pet");
const playerLives = document.getElementById("player-lives");
const enemyLives = document.getElementById("enemy-lives");
const messagesSection = document.getElementById("combat-result");
const playerAttackMessage = document.getElementById("player-attack-message");
const enemyAttackMessage = document.getElementById("enemy-attack-message");

let mokepons = [];
let playerAttack;
let enemyAttack;
let playerLivesCount = 3;
let enemyLivesCount = 3;

class Mokepon {
  constructor(name, photo, lives) {
    this.name = name;
    this.photo = photo;
    this.lives = lives;
  }
}

let hipodoge = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5);
let capipepo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5);

mokepons.push(hipodoge, capipepo, ratigueya);

function StartGame() {
  selectBtn.addEventListener("click", SelectPlayerPet);
  fireBtn.addEventListener("click", FireAttack);
  waterBtn.addEventListener("click", WaterAttack);
  dirtBtn.addEventListener("click", DirtAttack);
  restartBtn.addEventListener("click", RestartGame);

  selectAttackSection.style.display = "none";
  restartSection.style.display = "none";
}

function SelectPlayerPet() {
  selectAttackSection.style.display = "flex";
  selectPetSection.style.display = "none";

  if (hipodogeInput.checked) {
    playerPetSpan.innerHTML = "Hipodoge";
  }
  else if (capipepoInput.checked) {
    playerPetSpan.innerHTML = "Capipepo";
  }
  else if (ratigueyaInput.checked) {
    playerPetSpan.innerHTML = "Ratigüeya";
  }
  else {
    alert("Debes seleccionar a una mascota!");
    RestartGame();
  }

  SelectEnemyPet();
}

function SelectEnemyPet() {
  let selectedPet = GenerateRandomNumber(1, 3);

  if (selectedPet === 1) {
    enemyPetSpan.innerHTML = "Hipodoge";
  }
  else if (selectedPet === 2) {
    enemyPetSpan.innerHTML = "Capipepo";
  }
  else {
    enemyPetSpan.innerHTML = "Ratigüeya"
  }
}

function FireAttack() {
  playerAttack = "FUEGO";
  RandomEnemyAttack();
}

function WaterAttack() {
  playerAttack = "AGUA";
  RandomEnemyAttack();
}

function DirtAttack() {
  playerAttack = "TIERRA";
  RandomEnemyAttack();
}

function RandomEnemyAttack() {
  let selectedEnemyAttack = GenerateRandomNumber(1, 3);

  if (selectedEnemyAttack === 1) {
    enemyAttack = "FUEGO";
  }
  else if (selectedEnemyAttack === 2) {
    enemyAttack = "AGUA";
  }
  else {
    enemyAttack = "TIERRA";
  }

  Combat();
}

function Combat() {
  if (enemyAttack == playerAttack) {
    CreateBattleMessage("EMPATE");
  }
  else if (playerAttack == "FUEGO" && enemyAttack == "TIERRA" || playerAttack == "AGUA" && enemyAttack == "FUEGO" || playerAttack == "TIERRA" && enemyAttack == "AGUA") {
    enemyLivesCount--;
    enemyLives.innerHTML = enemyLivesCount;
    CreateBattleMessage("GANASTE!");
  }
  else {
    playerLivesCount--;
    playerLives.innerHTML = playerLivesCount;
    CreateBattleMessage("PERDISTE!");
  }

  CheckLives();
}

function CheckLives() {
  if (enemyLivesCount == 0) {
    CreateGameOverMessage("JUGADOR GANA!!!");
  }
  else if (playerLivesCount == 0) {
    CreateGameOverMessage("ENEMIGO GANA!!!");
  }
}

function CreateBattleMessage(battleResult) {
  let newPlayerBattleMessage = document.createElement("p");
  let newEnemyBattleMessage = document.createElement("p");

  messagesSection.innerHTML = battleResult;
  newPlayerBattleMessage.innerHTML = playerAttack;
  newEnemyBattleMessage.innerHTML = enemyAttack;

  playerAttackMessage.appendChild(newPlayerBattleMessage);
  enemyAttackMessage.appendChild(newEnemyBattleMessage);
}

function CreateGameOverMessage(gameOverResult) {
  messagesSection.innerHTML = gameOverResult;

  fireBtn.disabled = true;
  waterBtn.disabled = true;
  dirtBtn.disabled = true

  restartSection.style.display = "block";
}

function RestartGame() {
  location.reload();
}

function GenerateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", StartGame);