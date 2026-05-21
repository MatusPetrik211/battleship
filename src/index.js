import "./styles.css";
import { Ship, HumanPlayer, ComputerPlayer } from "./battleship.js";

const BOARD_SIZE = 10;
const SHIP_LENGTHS = [1, 1, 2, 3, 4, 5];

const gameboards = document.querySelectorAll(".gameboard");
const randomBtn = document.querySelector(".random-btn");

const humanPlayer = HumanPlayer();
const computerPlayer = ComputerPlayer();

randomBtn.addEventListener("click", () => { 
    getRandomPlacement(humanPlayer);
    displayShips(humanPlayer.gameboard.board, gameboards[0]);
});

function fillGameboards(gameboardDivs) {
    for (const gameboardDiv of gameboardDivs) {
        const isComputerBoard = gameboardDiv.classList.contains("computer-gameboard");

        for (let i = 0; i < BOARD_SIZE; i++) {
            const column = document.createElement('div');
            column.classList.add('column');
            gameboardDiv.appendChild(column);

            for (let j = 0; j < BOARD_SIZE; j++) {
                const block = document.createElement('div');
                block.classList.add("block");

                if (isComputerBoard) {
                    block.classList.add("computer-block");
                } else {
                    block.classList.add("player-block");
                }

                column.appendChild(block);
            }
        }
    }
}

fillGameboards(gameboards);

function getRandomPos() {
    return Math.floor(Math.random() * BOARD_SIZE);
}

function getRandomRotation() {
    return Math.random() > 0.5 ? "V" : "H";
}

function displayShips(gameboard, gameboardDiv) {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (gameboard[i][j] === 1) {
                gameboardDiv.children[j].children[i].style.backgroundColor = "black";
            }
        }
    }
}

function clearGameboard(gameboard, gameboardDiv) {
    for (const arr of gameboard.board) {
        arr.fill(0);
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            gameboardDiv.children[j].children[i].style.backgroundColor = "white";
        }
    }
}

function getRandomPlacement(player) {
    clearGameboard(player.gameboard ,gameboards[0]);

    const ships = SHIP_LENGTHS.map((length) => Ship(length));
    for (const ship of ships) {
        let playerX = getRandomPos();
        let playerY = getRandomPos();
        let playerRotation =  getRandomRotation();
        
        player.gameboard.placeShip(ship, playerX, playerY, playerRotation);
    }
}


