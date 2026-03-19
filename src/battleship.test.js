import { Ship, Gameboard, humanPlayer, computerPlayer } from "./battleship.js"

describe("test Ship factory function", () => {
  let ship1 = Ship(4);
  let ship2 = Ship(2);

  test("test ship1 with length of 4", () => {
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
  });

  test("test ship2 with length of 2", () => {
    expect(ship2.isSunk()).toBe(false);
    ship2.hit();
    expect(ship2.isSunk()).toBe(false);
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
  });
});

describe("test Gameboard factory function", () => {
  let board1 = Gameboard()

  test("board should be array", () => {
    expect(Array.isArray(board1.board)).toBe(true);
  });

  test("test the array board to be 10x10 array", () => {
    expect(board1.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
  });
});

describe("test Gameboard placeShip method", () => {
  let ship1 = Ship(4);
  let ship2 = Ship(3);
  let ship3 = Ship(2);

  const gameboard1 = Gameboard();

  test("tests for ships placed by default (horizontally)", () => {
    gameboard1.placeShip(ship3, 0, 0);
    expect(gameboard1.board).toEqual([
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard1.placeShip(ship1, 6, 5);
    expect(gameboard1.board).toEqual([
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard1.placeShip(ship2, 3, 9);
    expect(gameboard1.board).toEqual([
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0]]);
  });

  const gameboard2 = Gameboard();

  test("tests for ships placed by default where the x coordinate is out of range", () => {
    gameboard2.placeShip(ship3, 9, 0);
    expect(gameboard2.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard2.placeShip(ship1, 7, 5);
    expect(gameboard2.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard2.placeShip(ship2, 8, 9);
    expect(gameboard2.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]]);
  });

  const gameboard3 = Gameboard();

  test("tests for ships placed vertically", () => {
    gameboard3.placeShip(ship3, 0, 0, "V");
    expect(gameboard3.board).toEqual([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard3.placeShip(ship1, 6, 5, "V");
    expect(gameboard3.board).toEqual([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard3.placeShip(ship2, 3, 7, "V");
    expect(gameboard3.board).toEqual([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]]);
  });

  const gameboard4 = Gameboard();

  test("tests for ships placed vertically where the y coordinate is out of range", () => {
    gameboard4.placeShip(ship3, 0, 9, "V");
    expect(gameboard4.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    gameboard4.placeShip(ship1, 6, 7, "V");
    expect(gameboard4.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0]]);

    gameboard4.placeShip(ship2, 3, 8, "V");
    expect(gameboard4.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0]]);
  });
});

describe("test Gameboard receiveAttack method", () => {
  const ship1 = Ship(2);
  const ship2 = Ship(3);
  const ship3 = Ship(4);
  const gameboard1 = Gameboard();

  gameboard1.placeShip(ship1, 0, 0);
  gameboard1.placeShip(ship2, 9, 9);
  gameboard1.placeShip(ship3, 5, 8);
  // console.log(ship1.startCoords);
  // console.log(ship2.startCoords);

  test("test for horizontally placed ships", () => {
    expect(ship1.isSunk()).toBe(false);
    gameboard1.receiveAttack(0, 0);
    expect(ship1.isSunk()).toBe(false);
    gameboard1.receiveAttack(1, 0);
    expect(ship1.isSunk()).toBe(true);

    expect(ship2.isSunk()).toBe(false);
    gameboard1.receiveAttack(9, 9);
    expect(ship2.isSunk()).toBe(false);
    gameboard1.receiveAttack(7, 9);
    expect(ship2.isSunk()).toBe(false);
    gameboard1.receiveAttack(8, 9);
    expect(ship2.isSunk()).toBe(true);


    gameboard1.receiveAttack(5, 8);
    expect(ship3.isSunk()).toBe(false);
    gameboard1.receiveAttack(6, 8);
    expect(ship3.isSunk()).toBe(false);
    gameboard1.receiveAttack(8, 8);
    expect(ship3.isSunk()).toBe(false);
    gameboard1.receiveAttack(7, 8);
    expect(ship3.isSunk()).toBe(true);
  });

  const ship4 = Ship(2);
  const ship5 = Ship(3);
  const ship6 = Ship(4);

  const gameboard2 = Gameboard();

  gameboard2.placeShip(ship4, 6, 7, "V");
  gameboard2.placeShip(ship5, 9, 9, "V");
  gameboard2.placeShip(ship6, 3, 4, "V");

  console.log(ship4.startCoords);

  test("test for vertically placed ships", () => {
    expect(ship4.isSunk()).toBe(false);
    gameboard2.receiveAttack(6, 7);
    expect(ship4.isSunk()).toBe(false);
    gameboard2.receiveAttack(6, 8);
    expect(ship4.isSunk()).toBe(true);

    expect(ship5.isSunk()).toBe(false);  
    gameboard2.receiveAttack(9, 9);
    expect(ship5.isSunk()).toBe(false);
    gameboard2.receiveAttack(9, 8);         
    expect(ship5.isSunk()).toBe(false);
    gameboard2.receiveAttack(9, 7);
    expect(ship5.isSunk()).toBe(true);

    expect(ship6.isSunk()).toBe(false);  
    gameboard2.receiveAttack(3, 4);
    expect(ship6.isSunk()).toBe(false);
    gameboard2.receiveAttack(3, 7);         
    expect(ship6.isSunk()).toBe(false);
    gameboard2.receiveAttack(3, 5);
    expect(ship6.isSunk()).toBe(false);
    gameboard2.receiveAttack(3, 6);
    expect(ship6.isSunk()).toBe(true);
  });

  const gameboard3 = Gameboard();

  test("test missed attacks on the gameboard", () => {
    gameboard3.receiveAttack(0, 0);
    gameboard3.receiveAttack(9, 9);
    gameboard3.receiveAttack(0, 4);
    gameboard3.receiveAttack(4, 4);
    gameboard3.receiveAttack(4, 5);
    gameboard3.receiveAttack(1, 1);
    gameboard3.receiveAttack(2, 2);
    gameboard3.receiveAttack(9, 8);
    gameboard3.receiveAttack(6, 7);
    gameboard3.receiveAttack(8, 8);
    gameboard3.receiveAttack(7, 7);

    // console.log(gameboard3.board);

    expect(gameboard3.board).toEqual([
      ["X", 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, "X", 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, "X", 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      ["X", 0, 0, 0, "X", 0, 0, 0, 0, 0], 
      [0, 0, 0, 0, "X", 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, "X", "X", 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, "X", "X"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, "X"]]);
  });
});

describe("test Gameboard allShipsSunked method", () => {
  const emptyGameboard = Gameboard();
  const gameboardWithShips = Gameboard();

  const ship1 = Ship(2);
  const ship2 = Ship(3);
  const ship3 = Ship(4);

  gameboardWithShips.placeShip(ship1, 0, 0);
  gameboardWithShips.placeShip(ship2, 0, 1);
  gameboardWithShips.placeShip(ship3, 0, 2);


  test("test for empty gameboard", () => {
    expect(emptyGameboard.allShipsSunk()).toBe(true);
  });

  test("test for gameboard with ships", () => {
    expect(gameboardWithShips.allShipsSunk()).toBe(false);
  });

  const gameboard1 = Gameboard();

  const ship5 = Ship(2);

  gameboard1.placeShip(ship5, 0, 0);

  test("test for gameboard with ship that is hit later", () => {
    expect(gameboard1.allShipsSunk()).toBe(false);
    gameboard1.receiveAttack(0, 0);
    gameboard1.receiveAttack(1, 0);
    // console.log(ship5.isSunk());
    // console.log(gameboard1.allShipsSunk());
    // console.log(gameboard1.board);
    expect(gameboard1.allShipsSunk()).toBe(true);
  });
});

describe("test humanPlayer factory function", () => {
  const player = humanPlayer();

  test("humanPlayer should have defined board", () => {
    expect(player.gameboard).toBeDefined();
  });
});

describe("test computerPlayer factory function", () => {
  const player = computerPlayer();

  test("computerPlayer should have defined board", () => {
    expect(player.gameboard).toBeDefined();
  });
});