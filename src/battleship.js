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

  function placeShip(ship, x, y, rotated = false) {
    ship.cords[0] = [x, y];

    // if ship is rotated (vertically)
    if (rotated) {
      // if y axis plus the ship length is out of index of the array then move the ship so it fits
      if (y + ship.length > board[x].length) {
        y = board[x].length - ship.length;
      } 

      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = 1;
      }
    } else { // if x axis plus the ship length is out of index of the array then move the ship so it fits
      if (x + ship.length > board[y].length) {
          x = board[y].length - ship.length;
      } 

      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = 1;
      }

      console.log(board)
    }
  }

  return {
    board,
    placeShip,
  }
}