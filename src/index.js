import "./styles.css";
import { Ship, Gameboard, humanPlayer, computerPlayer } from "./battleship.js"

const gameboards = document.querySelectorAll(".gameboard");

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
    return Math.floor(Math.random()) > 0.5 ? "V" : "H";
}

function displayShips(gameboard) {

}

function startGame(humanPlayer, computerPlayer) {
    const shipLengths = [1, 1, 2, 3, 4, 5];
    for (const length in shipLengths) {
        let playerX = getRandomPos();
        let playerY = getRandomPos();
        let playerRotation =  getRandomRotation();

        let computerX = getRandomPos();
        let computerY = getRandomPos();
        let computerRotation =  getRandomRotation();

        humanPlayer.gameboard.placeShip(Ship(length), playerX, playerY, playerRotation);
        computerPlayer.gameboard.placeShip(Ship(length), computerX, computerY, computerRotation);
    }
}