export { Ship, Gameboard, Player, HumanPlayer, ComputerPlayer }

const Ship = (length) => {
  let hitCount = 0;
  let startCoords = [0, 0];
  let rotation = "H";

  function hit() {
    if (!isSunk()) {
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
    startCoords,
    rotation,
  }
}

const Gameboard = () => {
  const ships = [];
  // creates a 2d array with the length of 10 x 10
  const board = Array.from({ length: 10 }, () => Array(10).fill(0));

  // if axis plus the ship length is out of index of the array then move the ship so it fits
  function clampPosition(pos, shipLength) {
    return pos + shipLength > 10 ? 10 - shipLength : pos;
  }

  function placeShip(ship, x, y, rotation = "H") {
    // If no specific position is provided, use random
    let attempts = 0;
    const maxAttempts = 1000;
    let currentX = x;
    let currentY = y;
    let currentRotation = rotation;
    let foundValidPlacement = false;
    
    const useRandom = (x === undefined || y === undefined);
    
    while (!foundValidPlacement && attempts < maxAttempts) {
        if (useRandom || attempts > 0) {
            currentX = Math.floor(Math.random() * board[0].length);
            currentY = Math.floor(Math.random() * board.length);
            currentRotation = Math.random() < 0.5 ? "H" : "V";
        }
        
        // Apply clampPosition BEFORE validation
        let checkX = currentX;
        let checkY = currentY;
        
        if (currentRotation === "H") {
            checkX = clampPosition(currentX, ship.length);
        } else {
            checkY = clampPosition(currentY, ship.length);
        }
        
        if (isValidPlacement(ship, checkX, checkY, currentRotation)) {
            foundValidPlacement = true;
            currentX = checkX;
            currentY = checkY;
            break;
        }
        attempts++;
    }
    
    if (!foundValidPlacement) {
        console.log("Could not find valid placement after " + maxAttempts + " attempts");
        return false;
    }

    ships.push(ship);
    
    if (currentRotation === "H") {
      ship.rotation = "H";
      for (let i = 0; i < ship.length; i++) {
        board[currentY][currentX + i] = 1;
      }
    } else if (currentRotation === "V") {
      ship.rotation = "V";
      for (let i = 0; i < ship.length; i++) {
        board[currentY + i][currentX] = 1;
      }
    }

    ship.startCoords = [currentX, currentY];
    return true;
  }

  function isValidPlacement(ship, x, y, rotation) {
    // First check if ship fits within board boundaries
    if (rotation === "H") {
        if (x + ship.length > board[0].length) return false;
        
        // Check ship cells + surrounding cells for spacing
        for (let i = -1; i <= ship.length; i++) {
            for (let dy = -1; dy <= 1; dy++) {
                const checkX = x + i;
                const checkY = y + dy;
                
                // Skip out of bounds
                if (checkX < 0 || checkX >= board[0].length || 
                    checkY < 0 || checkY >= board.length) continue;
                
                // Within ship cells
                if (i >= 0 && i < ship.length && dy === 0) {
                    if (board[checkY][checkX] === 1) return false; // Overlap
                } 
                // Adjacent cells (including diagonals)
                else {
                    if (board[checkY][checkX] === 1) return false; // Too close
                }
            }
        }
    } 
    else if (rotation === "V") {
        if (y + ship.length > board.length) return false;
        
        // Check ship cells + surrounding cells for spacing
        for (let i = -1; i <= ship.length; i++) {
            for (let dx = -1; dx <= 1; dx++) {
                const checkX = x + dx;
                const checkY = y + i;
                
                // Skip out of bounds
                if (checkX < 0 || checkX >= board[0].length || 
                    checkY < 0 || checkY >= board.length) { continue };
                
                // Within ship cells
                if (i >= 0 && i < ship.length && dx === 0) {
                    if (board[checkY][checkX] === 1) {
                      return false;
                    } // Overlap
                }
                // Adjacent cells (including diagonals)
                else {
                    if (board[checkY][checkX] === 1) {
                      return false
                    }; // Too close
                }
            }
        }
    }
    
    return true; // Placement is valid
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
            ship.hit();
          }
        }
      }
    }
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk() === true);
  }

  function reset() {

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
  
    ships.length = 0;
  }

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk,
    reset,
  }
}

const Player = () => {
  const gameboard = Gameboard();
  return {
    gameboard,
  }
}

const HumanPlayer = () => {
  return {
    ...Player(),
  }
}

const ComputerPlayer = () => { 
  return {
    ...Player(),
  } 
}