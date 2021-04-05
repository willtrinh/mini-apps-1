/*
- 3x3 grid
  - grid should be clickable
  - grid cells display correct played icons
- should display a message informing current player's turn
- reset button
  - should reset the entire game -> reset board and player moves.
*/

// Array.from will turn the document array into javascript-like array
const grids = Array.from(document.getElementsByClassName('grid'));
console.log(grids);


const renderBoard = () => {
  // for each grid add vertical and/or horizontal class to draw each grid border
  grids.forEach((grid, index) => {
    if (index === 1 || index === 7 || index === 4) {
      grid.classList.add('vertical');
    }
    if (index > 2 && index < 6) {
      grid.classList.add('horizontal');
    }
    // add an event listener for each grid clicked
    grid.addEventListener('click', onGridClick);
  })
}

const onGridClick = (e) => {
  console.log('grid clicked');
}

renderBoard();