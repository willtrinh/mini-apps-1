/*
- 3x3 grid
  - grid should be clickable
  - grid cells display correct played icons
- should display a message informing current player's turn
- reset button
  - should reset the entire game -> reset board and player moves.
*/

// Array.from will turn the document array into javascript-like array
const squares = Array.from(document.getElementsByClassName('square'));
// store already placed moves in an array to check for invalid user's click
const square = [false, false, false, false, false, false, false, false, false];
const player1 = 'X';
const player2 = 'O';

// initial current player is X
let currentPlayer = 'X';


const renderBoard = () => {
  // for each grid add vertical and/or horizontal class to draw each grid border
  squares.forEach((square, index) => {
    if (index === 1 || index === 7 || index === 4) {
      square.classList.add('vertical');
    }
    if (index > 2 && index < 6) {
      square.classList.add('horizontal');
    }
    // add an event listener for each square clicked
    square.addEventListener('click', onSquareClick);
  })
}

const onSquareClick = (e) => {
  // get the square's id when the user clicks the specific square
  const id = e.target.id;
  // console.log(`squareId ${squareId} clicked`);
  // check if the square is already occupied
  if (!square[id]) {
    // if not, set the square[id] to the currentPlayer sign
    square[id] = currentPlayer;
    // update the currentPlayer to the other sign, X -> O or O -> X
    e.target.innerText = currentPlayer;
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else if (currentPlayer === player2) {
      currentPlayer = player1;
    }
  }
}

renderBoard();