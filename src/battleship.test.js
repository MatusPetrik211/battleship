import { Ship, Gameboard } from "./battleship.js"

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