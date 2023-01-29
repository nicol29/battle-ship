import { Ship } from "./ship";

export function Gameboard (entity) {
  let playerName = entity;
  let shipsSunk = 0;
  let gameGrid = [];

  for(let i = 0; i < 10; i++){
    gameGrid.push([]);

    for(let j = 0; j < 10; j++){
      gameGrid[i][j] = 0;
    }
  }  

  let getGameGrid = () => gameGrid;

  function placeShips (ships, xCoord, yCoord) {
    let ship;
    
    if(ships.length > 0) {
      ship = ships[0];
    } else {
      return;
    }

    let maxIndexLength = (xCoord + ship.shipLength) - 1;

    if(maxIndexLength <= 10){
      for(let i = xCoord - 1; i < maxIndexLength; i++){
        gameGrid[yCoord - 1][i] = ship;
      }
      return true;
    }
    return false;
  }

  function placeAIShips (shipsList) {
    shipsList.forEach((ship) => {
      let randXCoord;
      let randYCoord;
      let placed = false;

      while(!placed){
        randXCoord = Math.floor(Math.random() * (10 - ship.shipLength));
        randYCoord = Math.floor(Math.random() * 10);

        for(let i = randXCoord; i < randXCoord + ship.shipLength; i++){
          if(gameGrid[randYCoord][i] === '*'){
            break
          }
          if(i === (randXCoord + ship.shipLength) - 1) placed = true;
        }
      }
      for(let i = randXCoord; i < randXCoord + ship.shipLength; i++){
        gameGrid[randYCoord][i] = ship;
      }
    })
  }

  function receiveAttack (xCoord, yCoord) {
    let pickedSquare = gameGrid[yCoord - 1][xCoord - 1];

    if(typeof pickedSquare === 'object'){
      console.log('ship hit!');
      pickedSquare.hit();
      if(pickedSquare.isSunk()) console.log('You sank the ship!');
      gameGrid[yCoord - 1][xCoord - 1] = 'X';
    } else{
      gameGrid[yCoord - 1][xCoord - 1] = '1';
    }
  }

  return {
    placeShips,
    placeAIShips,
    getGameGrid,
    receiveAttack
  }
}