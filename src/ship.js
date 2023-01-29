export function Ship (type, length) {
  let shipType = type;
  let shipLength = length;
  let hitAmount = 0;
  let sunk = false

  function hit() {
    hitAmount++
  }

  function isSunk() {
    if(hitAmount === shipLength) sunk = true;
    
    return sunk;
  }

  let getHitAmount = () => hitAmount;

  return { 
    shipType,
    shipLength,
    hitAmount,
    sunk,
    hit,
    isSunk,
    getHitAmount
  }
};
