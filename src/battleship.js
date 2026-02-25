export { Ship, Gameboard }

function Ship(length) {
  let hitCount = 0;

  function hit() {
    if (!this.isSunk()) {
      hitCount++;
    }
  }

  function isSunk() {
    return hitCount >= length;
  }

  return {
    isSunk,
    hit,
  }
}

function Gameboard() {
  const board = []

  for (let i = 0; i < 10; i++) {
    let row = []
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
    board.push(row);
  }

  function placeShip(ship, x, y) {

  }

  return {
    board,
    placeShip,
  }
}