import "./styles.css";
import { Ship, HumanPlayer, ComputerPlayer } from "./battleship.js";
import closeBtn from "./icons/close.png";

const BOARD_SIZE = 10;
const SHIP_LENGTHS = [1, 1, 2, 3, 4, 5];
let PLAYER_BOARD_SET = false;

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

const gameboards = document.querySelectorAll(".gameboard");
fillGameboards(gameboards);

const randomBtn = document.querySelector(".random-btn");
const computerBlocks = document.querySelectorAll(".computer-block");
const playerBlocks = document.querySelectorAll(".player-block");
const instructions = document.querySelector(".instructions");

const humanPlayer = HumanPlayer();
const computerPlayer = ComputerPlayer();

randomBtn.addEventListener("click", () => { 
    getRandomPlacement(humanPlayer);
    getRandomPlacement(computerPlayer);
    displayShips(humanPlayer.gameboard.board, gameboards[0]);

    PLAYER_BOARD_SET = true;
});

computerBlocks.forEach(block => {
    block.addEventListener("click", () => {
        if (!PLAYER_BOARD_SET) {
            alert("Before launching an attack you need to set your board first");
            return;
        }

        instructions.style.visibility = "hidden";

        const parentColumn = block.parentElement;
        const gameboard = parentColumn.parentElement;

        const columnComputer = Array.from(gameboard.children).indexOf(parentColumn);
        const rowComputer = Array.from(parentColumn.children).indexOf(block);

        const columnHuman = getRandomPos();
        const rowHuman = getRandomPos();

        if ((computerPlayer.gameboard.board[rowComputer][columnComputer] === 'X') || (humanPlayer.gameboard.board[rowHuman][columnHuman] === 'X')) {
            return;
        } 
        
        // console.log("first if statement");
        if (computerPlayer.gameboard.board[rowComputer][columnComputer] === 1) {
            block.style.backgroundColor = `hsl(0, 99%, 49%)`;
        } else {
            block.style.backgroundColor = `hsl(0, 0%, 80%)`;
        }

        // console.log("second if statement");
        if (humanPlayer.gameboard.board[rowHuman][columnHuman] === 1) {
            playerBlocks[columnHuman * BOARD_SIZE + rowHuman].style.backgroundColor = `hsl(0, 99%, 49%)`;
        } else {
            playerBlocks[columnHuman * BOARD_SIZE + rowHuman].style.backgroundColor = `hsl(0, 0%, 80%)`;
        }

        // console.log("X added into cell" + count);
        playerBlocks[columnHuman * BOARD_SIZE + rowHuman].style.backgroundImage = `url(${closeBtn})`;
        playerBlocks[columnHuman * BOARD_SIZE + rowHuman].style.backgroundSize = `100%`;

        block.style.backgroundImage = `url(${closeBtn})`;
        block.style.backgroundSize = "100%";

        humanPlayer.gameboard.receiveAttack(columnHuman, rowHuman);
        computerPlayer.gameboard.receiveAttack(columnComputer, rowComputer);
    });
});

function getRandomPos(boardSize = BOARD_SIZE) {
    return Math.floor(Math.random() * boardSize);
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


