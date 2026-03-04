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
  // creates a 2d array with the length of 10 x 10
  const board = Array.from({ length: 10 }, () => Array(10).fill(0));

  // if axis plus the ship length is out of index of the array then move the ship so it fits
  function clampPosition(pos, shipLength) {
    return pos + shipLength > 10 ? 10 - shipLength : pos;
  }

  function placeShip(ship, x, y, rotation = "H") {
    // if ship is rotated by default (horizontally)
    if (rotation === "H") {
      x = clampPosition(x, ship.length);
      ship.cords = [[x, y], [x + ship.length, y]];

      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = 1;
      }
    } else if (rotation === "V") { // if ship is rotated vertically
      y = clampPosition(y, ship.length);
      ship.cords = [[x, y], [x, y + ship.length]];

      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = 1;
      }
    }
  }

  return {
    board,
    placeShip,
  }
}