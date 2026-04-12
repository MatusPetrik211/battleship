import "./styles.css";
import { Ship, Gameboard, HumanPlayer, ComputerPlayer } from "./battleship.js"

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

console.log("HI");

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
            console.log(gameboard[i]);
            console.log(gameboard[i][j]);
            if (gameboard[i][j] === 1) {
                gameboardDiv.children[i].children[j].style.backgroundColor = "black";
            }
        }
    }
}

function startGame() {
    const humanPlayer = HumanPlayer();
    const computerPlayer = ComputerPlayer();

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

    displayShips(humanPlayer.gameboard.board, gameboards[0]);
}

startGame();
// window.alert(gameboards[0]);
// window.alert("hello");
