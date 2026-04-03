import "./styles.css";
import { Ship, Gameboard, humanPlayer, computerPlayer } from "./battleship.js"

const gameboards = document.querySelectorAll(".gameboard");

function fillGameboard(gameboard) {
     function createColumn() {
        const column = document.createElement('div');
        column.classList.toggle('column');
        gameboard.appendChild(column);
        function createBlock() {
            const block = document.createElement('div');
            block.classList.toggle('block');
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

for (const gameboard of gameboards) {
    fillGameboard(gameboard);
}