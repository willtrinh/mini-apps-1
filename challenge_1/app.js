const squares = Array.from(document.getElementsByClassName('square'));
let square = [];
let squareCount;
const player1 = 'X';
const player2 = 'O';
const gameStatus = document.getElementById('game-status');
let gameEnded = false;
const resetBtn = document.getElementById('resetBtn');
let currentPlayer;

const winMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


const init = () => {
  squareCount = 0;
  gameEnded = false;
  squares.forEach((square) => {
    square.innerHTML = '';
  });
  square = [];
  currentPlayer = 'X';
  gameStatus.innerHTML = '';
}

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

const handlePlayerChange = () => {
  // update the currentPlayer to the other sign, X -> O or O -> X
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else if (currentPlayer === player2) {
    currentPlayer = player1;
  }
  // update currentPlayer's turn display message
  gameStatus.innerHTML = currentPlayerTurn();
}

const onSquareClick = (e) => {
  // stop the game if game over conditions met
  if (gameOver()) {
    return;
  }
  // get the square's id when the user clicks the specific square
  squareCount++;
  const id = e.target.id;
  // check if the square is already occupied or game has ended
  if (!square[id]) {
    // if not, set the square[id] to the currentPlayer sign & update event
    square[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    if (gameEnded) {
      return;
    }
    // check if the game is over (player has won or tied) after each player's move
    if (gameOver()) {
      // display messsage when a player has won
      gameStatus.innerHTML = winMessage();
      return;
    }
    // draw
    if (!gameOver() && squareCount === 9) {
      gameStatus.innerHTML = drawMessage();
      return;
    }
    handlePlayerChange();
  }
}

const gameOver = () => {
  // top left
  if (square[0] === currentPlayer) {
    if (square[1] === currentPlayer && square[2] === currentPlayer) {
      return true;
    }
    if (square[3] === currentPlayer && square[6] === currentPlayer) {
      return true;
    }
    if (square[4] === currentPlayer && square[8] === currentPlayer) {
      return true;
    }
  }
  // bottom right
  if (square[8] === currentPlayer) {
    if (square[2] === currentPlayer && square[5] === currentPlayer) {
      return true;
    }
    if (square[6] === currentPlayer && square[7] === currentPlayer) {
      return true;
    }
  }
  // middle
  if (square[4] === currentPlayer) {
    if (square[1] === currentPlayer && square[7] === currentPlayer) {
      return true;
    }
    if (square[3] === currentPlayer && square[5] === currentPlayer) {
      return true;
    }
  }
  // bottom left
  if (square[6] === currentPlayer) {
    if (square[0] === currentPlayer && square[3] === currentPlayer) {
      return true;
    }
    if (square[4] === currentPlayer && square[2] === currentPlayer) {
      return true;
    }
  }
}
resetBtn.addEventListener('click', init);

init();
renderBoard();