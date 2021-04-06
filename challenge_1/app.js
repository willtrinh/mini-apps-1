const squares = Array.from(document.getElementsByClassName('square'));
let square = []; // store the sign played in that specific square
let squareCount; // increment by 1 each time a player places their sign
let currentPlayer;
let loser = 'X';
let gamesWon = {x: 0, o: 0};
const player1 = 'X';
const player2 = 'O';
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('resetBtn');

// Display appropriate messages as the game progresses
const winMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const init = () => {
  squareCount = 0;
  square = [];
  // scoreboard

  // loser get to play first
  currentPlayer = loser;
  gameStatus.innerHTML = currentPlayerTurn();
  gameStatus.classList = '';
  // for each grid add vertical and/or horizontal class to draw each grid border
  squares.forEach((square, index) => {
    square.innerHTML = '';
    square.classList.remove('x', 'o');
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

const currentPlayerAddClass = (e) => {
  if (currentPlayer === 'X') {
    e.target.classList.add('x');
  } else if (currentPlayer === 'O') {
    e.target.classList.add('o');
  }
}
const onSquareClick = (e) => {
  // stop the game if game over conditions met
  if (gameOver()) {
    return;
  }
  // get the square's id when the user clicks the specific square
  const id = e.target.id;
  // check if the square is already occupied or game has ended
  if (!square[id]) {
    squareCount++;
    // if not, set the square[id] to the currentPlayer sign & update event
    square[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    currentPlayerAddClass(e);

    // check if the game is over (player has won or tied) after each player's move
    if (gameOver()) {
      // display messsage when a player has won
      gameStatus.innerHTML = winMessage();
      if (currentPlayer === 'X') {
        gameStatus.classList.add('winner', 'x');
        document.getElementById('player1').innerHTML = ++gamesWon.x;
        loser = 'O';
        return;
      } else if (currentPlayer === 'O') {
        gameStatus.classList.add('winner', 'o');
        document.getElementById('player2').innerHTML = ++gamesWon.o;
        loser = 'X';
        return;
      }
    }
    // draw
    if (!gameOver() && squareCount === 9) {
      gameStatus.innerHTML = drawMessage();
      gameStatus.classList.add('draw');
      return;
    }
    handlePlayerChange();
  }
}
// need to implement better logic
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
    if (square[4] === currentPlayer && square[2] === currentPlayer) {
      return true;
    }
  }
}

resetBtn.addEventListener('click', init);
init();
