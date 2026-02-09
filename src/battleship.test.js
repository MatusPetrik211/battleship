const battleship = require("./battleship");
const Ship = battleship.Ship;

describe("Ship tests", () => {
  let ship1 = Ship(4);
  test("test battleship methods", () => {
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
});
