export { Ship, Gameboard }

function Ship(length) {
  let hitCount = 0;
  let startCoords = [0, 0];
  let rotation = "H";

  function hit() {
    if (!this.isSunk()) {
      hitCount++;
    }
    // console.log(hitCount);
  }

  function isSunk() {
    return hitCount >= length;
  }

  return {
    isSunk,
    hit,
    length,
    startCoords,
    rotation,
  }
}

function Gameboard() {
  const ships = [];
  // creates a 2d array with the length of 10 x 10
  const board = Array.from({ length: 10 }, () => Array(10).fill(0));

  // if axis plus the ship length is out of index of the array then move the ship so it fits
  function clampPosition(pos, shipLength) {
    return pos + shipLength > 10 ? 10 - shipLength : pos;
  }

  function placeShip(ship, x, y, rotation = "H") {
    ships.push(ship);
    // if ship is rotated by default (horizontally)
    if (rotation === "H") {
      x = clampPosition(x, ship.length);
      ship.rotation = "H";

      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = 1;
      }
    } else if (rotation === "V") { // if ship is rotated vertically
      y = clampPosition(y, ship.length);
      ship.rotation = "V";

      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = 1;
      }
    }

    ship.startCoords = [x, y];
  }

  function getShipPlacement(ship) {
    const placementCoords = [];
    if (ship.rotation === "H") {
      for (let i = 0; i < ship.length; i++) {
        placementCoords.push([ship.startCoords[0] + i, ship.startCoords[1]]);
      }
    } else if (ship.rotation === "V") {
      for (let i = 0; i < ship.length; i++) {
        placementCoords.push([ship.startCoords[0], ship.startCoords[1] + i]);
      }
    }

    return placementCoords;
  }

  function receiveAttack(x, y) {
    if (board[y][x] === 0) {
      board[y][x] = "X";
    } else if (board[y][x] === 1 || board[y][x] === "X") {
      board[y][x] = "X";

      for (const ship of ships) {
        let shipPlacements = getShipPlacement(ship);
        for (const placement of shipPlacements) {
          if (placement[0] === x && placement[1] === y) {
            // console.log("Ship was hit!!");
            ship.hit();
          }
        }
      }
    }
  }

  function allShipsSunk() {
    let arr = ships.every((ship) => {ship.isSunk() === true});
    console.log(`arr: ${arr}`)
    return arr
  }

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk,
  }
}