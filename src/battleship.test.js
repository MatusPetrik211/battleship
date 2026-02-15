import { Ship } from "./battleship.js"

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
