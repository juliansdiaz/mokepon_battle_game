let playerAttack;
let enemyAttack;
let playerLivesCount = 3;
let enemyLivesCount = 3;

function StartGame() {
    let selectBtn = document.getElementById("select-button");
    selectBtn.addEventListener("click", SelectPlayerPet);

    let fireBtn = document.getElementById("fire-attack-button");
    fireBtn.addEventListener("click", FireAttack);

    let waterBtn = document.getElementById("water-attack-button");
    waterBtn.addEventListener("click", WaterAttack);

    let dirtBtn = document.getElementById("dirt-attack-button");
    dirtBtn.addEventListener("click", DirtAttack);

    let restartBtn = document.getElementById("restart-button");
    restartBtn.addEventListener("click", RestartGame);

    let selectAttackSection = document.getElementById("select-attack");
    selectAttackSection.style.display = "none";

    let restartSection = document.getElementById("restart");
    restartSection.style.display = "none";
}

function SelectPlayerPet() {
    let selectAttackSection = document.getElementById("select-attack");
    selectAttackSection.style.display = "block";

    let selectPetSection = document.getElementById("select-pet");
    selectPetSection.style.display = "none";

    let hipodogeInput = document.getElementById("hipodoge");
    let capipepoInput = document.getElementById("capipepo");
    let ratigueyaInput = document.getElementById("ratigueya");
    let playerPetSpan = document.getElementById("player-pet");

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
    let enemyPetSpan = document.getElementById("enemy-pet");

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
    let playerLives = document.getElementById("player-lives");
    let enemyLives = document.getElementById("enemy-lives");

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
    let battleMessage = document.createElement("p");
    let messagesSection = document.getElementById("messages");

    battleMessage.innerHTML = "Tu mascota atacó con " + playerAttack + ", la mascota del enemigo atacó con " + enemyAttack + " - " + battleResult;

    messagesSection.appendChild(battleMessage);
}

function CreateGameOverMessage(gameOverResult) {
    let messagesSection = document.getElementById("messages");

    let gameOverMessage = document.createElement("p");
    gameOverMessage.innerHTML = gameOverResult;

    messagesSection.appendChild(gameOverMessage);

    let fireBtn = document.getElementById("fire-attack-button");
    fireBtn.disabled = true;

    let waterBtn = document.getElementById("water-attack-button");
    waterBtn.disabled = true;
    let dirtBtn = document.getElementById("dirt-attack-button");
    dirtBtn.disabled = true
    let restartSection = document.getElementById("restart");
    restartSection.style.display = "block";
}

function RestartGame() {
    location.reload();
}

function GenerateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", StartGame);