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

  function placeShips (ships, coordX, coordY) {
    let ship;
    
    if(ships.length > 0) {
      ship = ships[0];
    } else {
      return;
    }

    let maxIndexLength = (coordX + ship.shipLength) - 1;

    if(maxIndexLength <= 10){
      for(let i = coordX - 1; i < maxIndexLength; i++){
        gameGrid[coordY - 1][i] = '*'
      }
      return true;
    }
    return false;
  }

  function placeAIShips (shipsList) {
    let randomCoords = [];
    let appropriateCoords = false;

    // while(randomCoords.length < 5){

    // }
    shipsList.forEach((ship, index) => {
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
        gameGrid[randYCoord][i] = '*'
      }
    })
  }

  function receiveAttack () {
    
  }

  return {
    placeShips,
    placeAIShips,
    getGameGrid,
    receiveAttack
  }
}