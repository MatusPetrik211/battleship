import "./styles.css";
import { Ship, HumanPlayer, ComputerPlayer } from "./battleship.js"

const gameboards = document.querySelectorAll(".gameboard");
const randomBtn = document.querySelector(".random-btn");

// randomBtn.addEventListener("click", getRandomPlacement);

function fillGameboard(gameboardDiv) {
     function createColumn() {
        const column = document.createElement('div');
        column.classList.toggle('column');
        gameboardDiv.appendChild(column);
        
        function createBlock() {
            const block = document.createElement('div');
            if (gameboardDiv.classList.contains("computer-gameboard")) {
                block.classList.toggle("computer-block");
            } else {
                block.classList.toggle("player-block");
            }
            block.classList.toggle("block");
            column.appendChild(block);
        }

        for(let i = 0; i < 10; i++) {
            createBlock();
        }
    }

    for(let i = 0; i < 10; i++) {
        createColumn();
    }
}

for (const gameboardDiv of gameboards) {
    fillGameboard(gameboardDiv);
}

function getRandomPos() {
    return Math.floor(Math.random() * 10);
}

function getRandomRotation() {
    return Math.random() > 0.5 ? "V" : "H";
}

function displayShips(gameboard, gameboardDiv) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameboard[i][j] === 1) {
                gameboardDiv.children[j].children[i].style.backgroundColor = "black";
            }
        }
    }
}

function clearGameboard(gameboardDiv) {
       for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gameboardDiv.children[j].children[i].style.backgroundColor = "white";
        }
    }
}

function getRandomPlacement(player) {
    clearGameboard(gameboards[0]);

    const shipLengths = [1, 1, 2, 3, 4, 5];
    const ships = shipLengths.map((length) => Ship(length));
    for (const ship of ships) {
        let playerX = getRandomPos();
        let playerY = getRandomPos();
        let playerRotation =  getRandomRotation();
        
        player.gameboard.placeShip(ship, playerX, playerY, playerRotation);
    }
}

function startGame() {
    const humanPlayer = HumanPlayer();
    const computerPlayer = ComputerPlayer();

    getRandomPlacement(humanPlayer);
    getRandomPlacement(computerPlayer);

    displayShips(humanPlayer.gameboard.board, gameboards[0]);
    displayShips(computerPlayer.gameboard.board, gameboards[1]);
}

startGame();
// window.alert(gameboards[0]);
// window.alert("hello");
