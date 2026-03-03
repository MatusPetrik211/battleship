export { Ship, Gameboard }

function Ship(length) {
  let hitCount = 0;
  let cords = [[0, 0], [0, 0]];

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
    length,
    cords,
  }
}

function Gameboard() {
  const board = Array.from({ length: 10 }, () => Array(10).fill(0));

  function placeShip(ship, x, y, rotated = false) {
    if (!rotated) {

      if (x + ship.length > board[y].length) {
          x = board[y].length - ship.length;
      } 

      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = 1;
      }
    }

    console.log(board);
  }

  return {
    board,
    placeShip,
  }
}