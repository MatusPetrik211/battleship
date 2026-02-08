import "./styles.css";

function Ship(length) {
  let hitCount = 0;
  let sank = false;

  function hit() {
    hitCount++;
    return hitCount
  }

  function isSunk() {
    sank = hitCount >= length ? true : false;
    return sank
  }

  return {
    isSunk,
    hit,
  }
}


