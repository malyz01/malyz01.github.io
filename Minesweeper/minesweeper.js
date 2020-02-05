document.addEventListener("DOMContentLoaded", startGame);
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

// Define your `board` object here!
var board = {
  cells: []
};

function getNoOfBomb() {
  return board.cells.filter(c => c.isMine).length;
}

function generateRandomBool(num) {
  return Math.random() >= 0.6;
}

function generateRow(num, boardSize) {
  let countRow = 1;
  let boardRow = [];
  for (var i = 0; boardRow.length < boardSize; i++) {
    boardRow.push(countRow);
    if (boardRow.filter(r => r === countRow).length >= num) {
      countRow++;
    }
  }
  return boardRow;
}

function generateCol(num, boardSize) {
  let countCol = 1;
  let boardCol = [];
  for (var i = 0; i < boardSize; i++) {
    boardCol.push(countCol);
    countCol++;
    if (countCol > num) {
      countCol = 1;
    }
  }
  return boardCol;
}

function generateBoard(num = 2) {
  if (num <= 1) {
    num = 2;
  }
  const boardSize = num * num;
  const boardRow = generateRow(num, boardSize);
  const boardCol = generateCol(num, boardSize);

  for (var i = 0; i < boardSize; i++) {
    board.cells[i] = {
      row: boardRow[i],
      col: boardCol[i],
      isMine: generateRandomBool(),
      hidden: true
    };
  }
}

function startGame(x) {
  // Don't remove this function call: it makes the game work!
  generateBoard(6);
  board.cells.forEach(x => (x.surroundingMines = countSurroundingMines(x)));
  lib.initBoard();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  const { cells } = board;
  const markedAllBombs =
    cells.map(c => c.isMine && c.isMarked).filter(c => c).length ===
    cells.map(c => c.isMine).filter(c => c).length;
  const showingAllCell =
    cells.map(c => !c.hidden).filter(c => c).length ===
    cells.map(c => !c.isMine).filter(c => c).length;
  if (showingAllCell && markedAllBombs) lib.displayMessage("You win!");
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  return surrounding.map(bombs => bombs.isMine).filter(b => b).length;
}
