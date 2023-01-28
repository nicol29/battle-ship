import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import './style.css';



let win = false;

// while (!win) {
  
// }


let playerGameboard = Gameboard('Player');

let carrier = Ship('Aircraft Carrier', 5);
let destroyer = Ship('Destroyer War Ship', 4);
let cruiser = Ship('Cruiser', 3);
let submarine = Ship('Submarine', 3);
let tugboat = Ship('Tug Boat', 2);

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

    for(let i = 0; i < 100; i++){
      let square = document.createElement('div');
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

  return  {
    drawGameboards,
    placeShipsRender
  }
})()


let allShipsToPlace = [
  carrier,
  destroyer,
  cruiser,
  submarine,
  tugboat
]

playerGameboard.receiveAttack();
DOM.drawGameboards();


let playerGrid = document.querySelector('.player-grid');


playerGrid.addEventListener('click', (e) => {
  let x = e.target.getAttribute('x');
  let y = e.target.getAttribute('y')

  let placeSuccessful = playerGameboard.placeShip(allShipsToPlace, parseInt(x), parseInt(y));
  if(placeSuccessful) {
    DOM.placeShipsRender(e.target, allShipsToPlace[0].shipLength);
    allShipsToPlace.shift();
  }
})





// let x = 1;
//     let y = 11;

//     for(let i = 0; i < 100; i++){
//       let square = document.createElement('div');

//       x++;

//       if(i % 10 === 0) {
//         y--;
//         x = 1;
//       }