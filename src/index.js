import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import './style.css';



let win = false;

// while (!win) {
  
// }


let playerGameboard = Gameboard('Player');
let aiGameboard = Gameboard('AI');

let playerCarrier = Ship('Aircraft Carrier', 5);
let playerDestroyer = Ship('Destroyer War Ship', 4);
let playerCruiser = Ship('Cruiser', 3);
let playerSubmarine = Ship('Submarine', 3);
let playerTugboat = Ship('Tug Boat', 2);

let aiCarrier = Ship('Aircraft Carrier', 5);
let aiDestroyer = Ship('Destroyer War Ship', 4);
let aiCruiser = Ship('Cruiser', 3);
let aiSubmarine = Ship('Submarine', 3);
let aiTugboat = Ship('Tug Boat', 2);


let DOM = (() => {
  let playerGridContainer = document.querySelector('.player-grid');
  let computerGridContainer = document.querySelector('.computer-grid');
  

  function drawGameboards () {
    let x = 1;
    let y = 0;

    for(let i = 0; i < 100; i++){
      let square = document.createElement('div');

      x++;

      if(i % 10 === 0) {
        y++;
        x = 1;
      }

      square.setAttribute('x', x);
      square.setAttribute('y', y);
      playerGridContainer.appendChild(square);
    }

    x = 1;
    y = 0;

    for(let i = 0; i < 100; i++){
      let square = document.createElement('div');

      x++;

      if(i % 10 === 0) {
        y++;
        x = 1;
      }

      square.setAttribute('x', x);
      square.setAttribute('y', y);
      computerGridContainer.appendChild(square);
    }
  }

  function placeShipsRender (targetSquare, shipLength) {
    let currentSquare = targetSquare;

    for(let i = 0; i < shipLength; i++){
      currentSquare.style.backgroundColor = 'cornflowerblue';
      currentSquare = currentSquare.nextSibling;
    }
  }

  let returnComputerGrid = () => computerGridContainer;

  return  {
    drawGameboards,
    placeShipsRender, 
    returnComputerGrid
  }
})()


let playerShipsToPlace = [
  playerCarrier,
  playerDestroyer,
  playerCruiser,
  playerSubmarine,
  playerTugboat
]

let aiShipsToPlace = [
  aiCarrier,
  aiDestroyer,
  aiCruiser,
  aiSubmarine,
  aiTugboat
]

aiGameboard.placeAIShips(aiShipsToPlace);
DOM.drawGameboards();

console.log(aiGameboard.getGameGrid());


let playerGrid = document.querySelector('.player-grid');
let computerGrid = document.querySelector('.computer-grid');

playerGrid.addEventListener('click', (e) => {
  let x = e.target.getAttribute('x');
  let y = e.target.getAttribute('y');

  let placeSuccessful = playerGameboard.placeShips(playerShipsToPlace, parseInt(x), parseInt(y));
  if(placeSuccessful) {
    DOM.placeShipsRender(e.target, playerShipsToPlace[0].shipLength);
    playerShipsToPlace.shift();
    console.log(playerGameboard.getGameGrid());
  }
})

computerGrid.addEventListener('click', (e) => {
  let x = parseInt(e.target.getAttribute('x'));
  let y = parseInt(e.target.getAttribute('y'));
  console.log(x, y);
  aiGameboard.receiveAttack(x, y);
  console.log(aiGameboard.getGameGrid());
})

