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

let fireBtn;
let waterBtn;
let dirtBtn;
let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let mokepons = [];
let playerAttack;
let enemyAttack;
let mokeponChoice;
let playerPet;
let mokeponAttacks;
let playerLivesCount = 3;
let enemyLivesCount = 3;

class Mokepon {
  constructor(name, photo, lives) {
    this.name = name;
    this.photo = photo;
    this.lives = lives;
    this.attacks = [];
  }
}

let hipodoge = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 5);
let capipepo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 5);

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
}

function SelectPlayerPet() {
  selectAttackSection.style.display = "flex";
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
  SelectEnemyPet();
}

function SelectEnemyPet() {
  let selectedPet = GenerateRandomNumber(0, mokepons.length - 1);

  enemyPetSpan.innerHTML = mokepons[selectedPet].name;
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
    mokeponAttacks = `<button id=${attacks.attackId} class="attack-button">${attacks.attackName}</button>`;

    mokeponAttackContainer.innerHTML += mokeponAttacks;
  })

  fireBtn = document.getElementById("fire-attack-button");
  waterBtn = document.getElementById("water-attack-button");
  dirtBtn = document.getElementById("dirt-attack-button");

  fireBtn.addEventListener("click", FireAttack);
  waterBtn.addEventListener("click", WaterAttack);
  dirtBtn.addEventListener("click", DirtAttack);
}

function RestartGame() {
  location.reload();
}

function GenerateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", StartGame);