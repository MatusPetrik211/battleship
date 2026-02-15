export { Ship }

function Ship(length) {
  let hitCount = 0;

  function hit() {
    if (!this.isSunk()) {
      hitCount++;
    }
  }

  function isSunk() {
    return hitCount >= length
  }

  return {
    isSunk,
    hit,
  }
}